// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD,
);
mongoose
    .connect(DB)
    .then(() => console.log('Connecting to database successfully!!'))
    .catch(() => console.log('Error when connecting to database'));
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running in port ${port}`);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
