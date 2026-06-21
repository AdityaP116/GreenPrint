const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { verifyToken } = require('../middleware/auth');

// Protected routes
router.use(verifyToken);

router.post('/submit', assessmentController.submitAssessment);
router.get('/latest', assessmentController.getLatestAssessment);

module.exports = router;
