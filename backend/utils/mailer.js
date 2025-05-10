const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thayanithi2006s@gmail.com',
        pass: 'vevf wmqi ihhl ijtw',
    },
});

const sendMail = (email, subject, text) => {
    return transporter.sendMail({
        from: 'thayanithi2006s@gmail.com',
        to: email,
        subject,
        text,
    });
};

module.exports = { sendMail };
