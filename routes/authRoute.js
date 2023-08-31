const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();
router.get('/login', (req, res, next) => {
    res.status(200).json({
        status: 'success',
    });
});
router.post('/signup', authController.signup);
module.exports = router;
