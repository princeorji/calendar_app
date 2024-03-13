const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const connectdb = require('./config/mongodb');
const Users = require('./models/users');
const transporter = require('./config/emailTransporter');
require('dotenv').config();

//Routes
const postForm = require('./routes/form.routes');

const app = express();
const port = process.env.PORT;

// Connect to Mongodb Database
connectdb();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// every day at 7am
cron.schedule('0 7 * * *', async () => {
    try {
        // Query database to get users whose birthday is today
        const users = await Users.find({ date: new Date().toISOString().slice(5, 10) });

        // Iterate over users and send birthday emails
        for (const user of users) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Happy Birthday!',
                html: `<p>Dear ${user.name},</p><p>Happy birthday! We wish you a fantastic day filled with joy and happiness.</p>`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Birthday email sent to ${user.email}`);
        };

    } catch (error) {
        console.error('Error sending birthday emails:', error);
    }
});


app.use('/submit', postForm);


app.get('/', (req, res) => {
    res.render('form');
});


app.get('/success', (req, res) => {
    res.render('success');
});


//error handler middleware
app.get('*', (req, res) => {
    res.render('error');
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});