const express = require('express');

const router = express.Router();
const {
    markAttendance,
    getAttendanceForReview,
    correctAttendance,
    submitAttendance,
} = require('../controllers/attendanceController');
const authenticateJwt = require('../middleware/auth'); // Secure all attendance routes

// All routes here are protected
router.use(authenticateJwt);

// @route   POST api/attendance/mark
// @desc    Create the initial attendance record for the day



router.post('/mark', markAttendance);

// @route   GET api/attendance/review/:sectionId/:date
// @desc    Get attendance record for review before submission

router.get('/review/:sectionId/:date', getAttendanceForReview);

// @route   PUT api/attendance/correct/:recordId
// @desc    Correct a specific student's status (Absent -> Present)

router.put('/correct/:recordId', correctAttendance);

// @route   POST api/attendance/submit/:recordId
// @desc    Finalize and lock the attendance record

router.post('/submit/:recordId', submitAttendance);

module.exports = router;