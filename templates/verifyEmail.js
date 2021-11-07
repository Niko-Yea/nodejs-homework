const createVerifyEmail = user => {
  const mail = {
    to: user.email,
    subject: 'Please verify your email',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Click to verify your email</a>`,
  }
  return mail
}

module.exports = createVerifyEmail
