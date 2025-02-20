const express = require('express');
const { sendOTP, verifyOTP,signup,login,getUserId } = require('../controller/Auth');
const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/signup',signup);
router.post('/login',login);
router.get('/get-user-id',getUserId);

module.exports = router;
