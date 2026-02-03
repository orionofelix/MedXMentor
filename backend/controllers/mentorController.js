const OpenAI = require('openai');
const MentorProfile = require('../models/MentorProfile');
const MentorConversation = require('../models/MentorConversation');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getOrCreateProfile = async (userId) => {
    let profile = await MentorProfile.findOne({ user: userId });
    if (!profile) {
        profile = await MentorProfile.create({ user: userId });
    }
    return profile;
};

const getOrCreateConversation = async (userId) => {
    let conversation = await MentorConversation.findOne({ user: userId });
    if (!conversation) {
        conversation = await MentorConversation.create({ user: userId, messages: [] });
    }
    return conversation;
};

const buildProfileContext = (profile) => {
    return [
        `Introduction: ${profile.introduction || 'Not provided'}`,
        `Hobbies: ${profile.hobbies || 'Not provided'}`,
        `Interests: ${profile.interests || 'Not provided'}`,
        `Goals: ${profile.goals || 'Not provided'}`,
    ].join('\n');
};

const isProfileIncomplete = (profile) => {
    return !profile.introduction || !profile.hobbies || !profile.interests || !profile.goals;
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await getOrCreateProfile(req.user.id);
        res.status(200).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await getOrCreateProfile(req.user.id);
        const { introduction, hobbies, interests, goals } = req.body;

        if (introduction !== undefined) profile.introduction = introduction;
        if (hobbies !== undefined) profile.hobbies = hobbies;
        if (interests !== undefined) profile.interests = interests;
        if (goals !== undefined) profile.goals = goals;

        await profile.save();
        res.status(200).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const profile = await getOrCreateProfile(req.user.id);
        const conversation = await getOrCreateConversation(req.user.id);
        res.status(200).json({
            success: true,
            profile,
            messages: conversation.messages || [],
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ success: false, message: 'OpenAI API key is not configured.' });
        }

        const { message } = req.body;
        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const profile = await getOrCreateProfile(req.user.id);
        const conversation = await getOrCreateConversation(req.user.id);

        const systemPrompt = `You are the MedXMentor Virtual Mentor. Be warm, supportive, and practical.\n` +
            `Personalize guidance based on the mentee profile below.\n` +
            `If any profile fields are missing, ask friendly questions to collect them.\n\n` +
            `${buildProfileContext(profile)}`;

        const recentMessages = (conversation.messages || []).slice(-12).map((msg) => ({
            role: msg.role,
            content: msg.content,
        }));

        const messages = [
            { role: 'system', content: systemPrompt },
            ...recentMessages,
            { role: 'user', content: message.trim() },
        ];

        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
            messages,
            temperature: 0.7,
        });

        const reply = completion.choices?.[0]?.message?.content?.trim() ||
            'Thanks for sharing. How can I support you further?';

        conversation.messages.push({ role: 'user', content: message.trim() });
        conversation.messages.push({ role: 'assistant', content: reply });
        await conversation.save();

        if (isProfileIncomplete(profile)) {
            try {
                const extraction = await openai.chat.completions.create({
                    model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'Extract introduction, hobbies, interests, and goals from the user message. ' +
                                'Return JSON with keys: introduction, hobbies, interests, goals. Use null when unknown.'
                        },
                        { role: 'user', content: message.trim() },
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.2,
                });

                const raw = extraction.choices?.[0]?.message?.content || '{}';
                const parsed = JSON.parse(raw);

                if (parsed.introduction && !profile.introduction) profile.introduction = parsed.introduction;
                if (parsed.hobbies && !profile.hobbies) profile.hobbies = parsed.hobbies;
                if (parsed.interests && !profile.interests) profile.interests = parsed.interests;
                if (parsed.goals && !profile.goals) profile.goals = parsed.goals;

                await profile.save();
            } catch (extractError) {
                // Silent fail on extraction to avoid blocking the response
            }
        }

        res.status(200).json({ success: true, reply, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
