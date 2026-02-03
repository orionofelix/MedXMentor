const express = require('express');
const { protect } = require('../middleware/auth');
const {
    getProfile,
    updateProfile,
    getHistory,
    sendMessage,
} = require('../controllers/mentorController');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/history', protect, getHistory);
router.post('/message', protect, sendMessage);

module.exports = router;
