const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thayanithi2006s@gmail.com',
    pass: 'vevf wmqi ihhl ijtw',
  },
});

exports.sendResetCode = (email, resetCode, callback) => {
  const mailOptions = {
    from: 'thayanithi2006s@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Your password reset code is: ${resetCode}`,
  };

  transporter.sendMail(mailOptions, callback);
};
