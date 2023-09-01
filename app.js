const express = require('express');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');
const globalHandleError = require('./controller/errorController');

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.set('view engine', 'pug');
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/api/v1', authRoute);
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello from the server',
    });
});
app.use(globalHandleError);
module.exports = app;
