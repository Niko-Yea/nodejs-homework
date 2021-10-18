// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const { Contact } = require('./contacts/contacts')
const { User } = require('./auth/users')

module.exports = {
  Contact,
  User,
}
