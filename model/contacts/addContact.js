const getAllContacts = require('./getAllContacts')
const updateContactsList = require('./updateContactsList')
const shortid = require('shortid')

const addContact = async (body) => {
  try {
    const contacts = await getAllContacts()
    const newContact = { id: shortid.generate(), ...body }
    const newListContacts = [...contacts, newContact]
    await updateContactsList(newListContacts)
    return newContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact
