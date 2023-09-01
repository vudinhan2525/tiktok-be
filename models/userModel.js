const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User must have a email'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid',
        },
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        trim: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'User should have a password confirm'],
        trim: true,
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Password confirm is not correct',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangeAt: Date,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
});
userSchema.methods.checkPassword = async (passwordInput, passwordDatabase) =>
    await bcrypt.compare(passwordInput, passwordDatabase);
const User = mongoose.model('User', userSchema);
module.exports = User;
