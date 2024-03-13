const Users = require('../models/users');
const transporter = require('../config/emailTransporter');
require('dotenv').config();

const postForm = async (req, res) => {
    try {
        const { name, email, date } = req.body;
        const newUser = new Users({ name, email, date });
        await newUser.save();

        // Send email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Registration Successful',
            html: `<p>Dear ${name},</p><p>Thank you for registering with us. Your registration details are as follows:</p><ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Date of Birth: ${date}</li></ul>`,
        };
        await transporter.sendMail(mailOptions);

        res.redirect('/success');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { postForm };