const Assessment = require('../models/Assessment');
const User = require('../models/User');

// @desc    Create new assessment
// @route   POST /api/assessments
// @access  Private
exports.createAssessment = async (req, res) => {
    try {
        const { competencies, milestones, strengths, areasForImprovement, nextSteps } = req.body;

        // Create assessment
        const assessment = await Assessment.create({
            menteeId: req.user.id,
            competencies,
            milestones,
            strengths,
            areasForImprovement,
            nextSteps,
            submittedBy: 'self',
        });

        res.status(201).json({
            success: true,
            data: assessment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all assessments for logged in mentee
// @route   GET /api/assessments
// @access  Private
exports.getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find({ menteeId: req.user.id }).sort({
            assessmentDate: -1,
        });

        res.status(200).json({
            success: true,
            count: assessments.length,
            data: assessments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single assessment
// @route   GET /api/assessments/:id
// @access  Private
exports.getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found',
            });
        }

        // Verify ownership
        if (assessment.menteeId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this assessment',
            });
        }

        res.status(200).json({
            success: true,
            data: assessment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get dashboard summary (latest assessment + progress)
// @route   GET /api/assessments/dashboard/summary
// @access  Private
exports.getDashboardSummary = async (req, res) => {
    try {
        const assessments = await Assessment.find({ menteeId: req.user.id }).sort({
            assessmentDate: -1,
        });

        if (assessments.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    latestAssessment: null,
                    totalAssessments: 0,
                    overallProgress: 0,
                    progressTrend: [],
                },
            });
        }

        const latestAssessment = assessments[0];
        const progressTrend = assessments.slice(0, 5).reverse(); // Last 5 assessments

        res.status(200).json({
            success: true,
            data: {
                latestAssessment,
                totalAssessments: assessments.length,
                overallProgress: latestAssessment.overallProgress,
                progressTrend,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update assessment
// @route   PUT /api/assessments/:id
// @access  Private
exports.updateAssessment = async (req, res) => {
    try {
        let assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found',
            });
        }

        // Verify ownership
        if (assessment.menteeId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this assessment',
            });
        }

        // Update fields
        assessment = await Assessment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: assessment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete assessment
// @route   DELETE /api/assessments/:id
// @access  Private
exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found',
            });
        }

        // Verify ownership
        if (assessment.menteeId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this assessment',
            });
        }

        await Assessment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Assessment deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
