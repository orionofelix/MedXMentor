const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide a first name'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please provide a last name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
            select: false, // Don't return password by default
        },
        menteeId: {
            type: String,
            unique: true,
            sparse: true,
        },
        country: {
            type: String,
            enum: ['Uganda', 'Kenya', 'Rwanda', 'Ethiopia', 'Nigeria'],
        },
        university: String,
        program: String,
        yearOfStudy: String,
        cohort: String,
        theme: {
            type: String,
            enum: ['Research', 'Leadership', 'Career', 'Innovation', ''],
            default: '',
        },
        profileImage: String,
        role: {
            type: String,
            enum: ['mentee', 'mentor', 'admin'],
            default: 'mentee',
        },
        profileComplete: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
