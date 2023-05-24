const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587, // 25,
  // secure: false,
  // service: 'gmail',
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: 'oclockdogtolib@outlook.com',
    pass: 'dogtolib!1',
  },
});
const mailOptions = {
  from: 'oclockdogtolib@outlook.com',
  to: 'pedopi8250@pgobo.com',
  subject: 'le sujet de votre email',
  text: 'le contenu de votre email',
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
