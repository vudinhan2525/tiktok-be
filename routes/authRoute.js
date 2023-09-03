const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/verifyjwt', authController.verifyJWT);
module.exports = router;
