// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
