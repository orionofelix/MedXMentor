const express = require('express');
const {
    createAssessment,
    getAssessments,
    getAssessment,
    getDashboardSummary,
    updateAssessment,
    deleteAssessment,
} = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/', createAssessment);
router.get('/', getAssessments);
router.get('/dashboard/summary', getDashboardSummary);
router.get('/:id', getAssessment);
router.put('/:id', updateAssessment);
router.delete('/:id', deleteAssessment);

module.exports = router;
