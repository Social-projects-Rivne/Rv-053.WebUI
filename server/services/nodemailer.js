require('dotenv').config();
const nodemailer = require('nodemailer');
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

exports.sendEmail = async options => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });

  var message = {
    from: EMAIL_USER,
    to: options.email,
    subject: options.subject || 'Please confirm email',
    html: options.message
  };

  await transporter.sendMail(message, (err, data) => {
    if (err) {
      throw err;
    }
  });
};
