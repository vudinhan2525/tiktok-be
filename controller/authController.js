// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const sendJWTToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED_IN,
    });
    const cookieOption = {
        httpOnly: true,
        expires: new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRED_IN * 24 * 60 * 60 * 1000,
        ),
    };
    if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
    res.cookie('jwt', token, cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user,
    });
};
exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });
    sendJWTToken(user, 200, res);
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password'), 400);
    }
    const user = await User.findOne({ email: email }).select('password');
    if (!user || !(await User.checkPassword(password, user.password))) {
        return next(new AppError('Email or password is incorrect'), 400);
    }

    res.status(200).json({
        status: 'success',
    });
});
