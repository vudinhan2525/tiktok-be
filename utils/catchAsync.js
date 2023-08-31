// eslint-disable-next-line arrow-body-style
const catchAsync = (cb) => {
    return (req, res, next) => {
        cb(req, res, next).catch((err) => next(err));
    };
};
module.exports = catchAsync;
