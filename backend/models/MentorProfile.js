const mongoose = require('mongoose');

const MentorProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        introduction: {
            type: String,
            default: '',
            trim: true,
        },
        hobbies: {
            type: String,
            default: '',
            trim: true,
        },
        interests: {
            type: String,
            default: '',
            trim: true,
        },
        goals: {
            type: String,
            default: '',
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('MentorProfile', MentorProfileSchema);
