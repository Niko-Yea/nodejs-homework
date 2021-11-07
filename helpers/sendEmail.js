const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async data => {
  const email = { ...data, from: 'nikoyea14@gmail.com' }

  try {
    await sgMail.send(email)
    return true
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
