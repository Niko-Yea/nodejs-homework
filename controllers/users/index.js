const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const verify = require('./verify')
const resendVerifyEmail = require('./resendVerifyEmail')
const updateAvatar = require('./updateAvatar')

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  resendVerifyEmail,
}
