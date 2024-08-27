const nodemailer = require('nodemailer')
const config = require('../config')

const sendEmail = async (to, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'monnavai54@gmail.com',
      pass: 'xfqj dshz wdui ymtb',
    },
  })

  await transporter.sendMail({
    from: 'monnavai54@gmail.com', // sender address
    to: to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html: html, // html body
  })
}

module.exports = {
  sendEmail,
}
