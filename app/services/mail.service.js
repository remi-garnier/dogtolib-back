const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587, // 25,
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: 'oclockdogtolib@outlook.com',
    pass: 'dogtolib!1',
  },
});

module.exports = {

  sendMail: async (recipient, subject, rawBody) => {
    const info = await transporter.sendMail({
      from: '"Dogtolib" <oclockdogtolib@outlook.com>', // sender address
      to: `${recipient}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${rawBody}`, // plain text body
    });
  },
};
