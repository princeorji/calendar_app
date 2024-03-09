const nodemailer = require('nodemailer');
require('dotenv').config();

// Ignore SSL certificate validation errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        type: 'login'
    },
});

module.exports = transporter;