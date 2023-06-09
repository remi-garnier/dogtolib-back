const nodemailer = require('nodemailer');

// Configuration de la connexion au serveur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secureConnection: false,
  port: parseInt(process.env.SMTP_PORT, 10),
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = {

  /**
   * @summary Envoi d'un mail
   * @param {string} recipient - Adresse mail du destinataire
   * @param {string} subject - Sujet du mail
   * @param {string} rawBody - Corps du mail
   */
  sendMail: async (recipient, subject, rawBody, html) => {
    const info = await transporter.sendMail({
      from: '"Dogtolib" <oclockdogtolib@gmail.com>', // sender address
      to: `${recipient}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${rawBody}`, // plain text body
      html: `${html}`, // html body
    });
    return info;
  },
};
