const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // നിങ്ങളുടെ Gmail ID
        pass: process.env.EMAIL_PASS  // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
};

module.exports = sendEmail;
