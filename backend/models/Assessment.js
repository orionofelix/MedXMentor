const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
    {
        menteeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assessmentDate: {
            type: Date,
            default: Date.now,
        },
        competencies: {
            clinicalKnowledge: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
            communication: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
            researchSkills: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
            leadership: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
            professionalism: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
            timeManagement: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
            },
        },
        milestones: {
            completedRotations: {
                type: Number,
                default: 0,
            },
            certificationsEarned: {
                type: Number,
                default: 0,
            },
            papersPublished: {
                type: Number,
                default: 0,
            },
            presentationsGiven: {
                type: Number,
                default: 0,
            },
            projectsCompleted: {
                type: Number,
                default: 0,
            },
        },
        overallProgress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        strengths: String,
        areasForImprovement: String,
        nextSteps: String,
        submittedBy: {
            type: String,
            enum: ['self', 'mentor'],
            default: 'self',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Calculate overall progress before saving
assessmentSchema.pre('save', function (next) {
    const { competencies, milestones } = this;

    // Calculate average competency rating
    const ratings = [];
    if (competencies.clinicalKnowledge.rating) ratings.push(competencies.clinicalKnowledge.rating);
    if (competencies.communication.rating) ratings.push(competencies.communication.rating);
    if (competencies.researchSkills.rating) ratings.push(competencies.researchSkills.rating);
    if (competencies.leadership.rating) ratings.push(competencies.leadership.rating);
    if (competencies.professionalism.rating) ratings.push(competencies.professionalism.rating);
    if (competencies.timeManagement.rating) ratings.push(competencies.timeManagement.rating);

    const avgRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b) / ratings.length) : 0;
    const competencyScore = (avgRating / 5) * 50; // 50% weight to competencies

    // Calculate milestone score
    const totalMilestones = milestones.completedRotations + milestones.certificationsEarned + milestones.papersPublished + milestones.presentationsGiven + milestones.projectsCompleted;
    const milestoneScore = Math.min((totalMilestones / 10) * 50, 50); // 50% weight to milestones, max 50

    this.overallProgress = Math.round(competencyScore + milestoneScore);
    next();
});

module.exports = mongoose.model('Assessment', assessmentSchema);
