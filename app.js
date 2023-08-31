const express = require('express');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/api/v1', authRoute);
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from the server',
    });
});
module.exports = app;
