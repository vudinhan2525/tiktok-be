// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const pug = require('pug');

class Email {
    constructor(user, url) {
        this.url = url;
        this.to = user.email;
        this.from = `Dev tiktok <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        if (process.env.NODE_ENV === 'production') {
            return 1;
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send(subject) {
        const html = pug.renderFile(
            path.join(__dirname, '../', 'utils', 'emailTemplate.pug'),
            {
                url: this.url,
            },
        );
        await this.createTransport().sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
        });
    }
}
module.exports = Email;
