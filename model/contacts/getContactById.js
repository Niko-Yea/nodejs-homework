const getAllContacts = require('./getAllContacts')

const getContactById = async contactId => {
  try {
    const contacts = await getAllContacts()
    const contact = contacts.find(contact => String(contact.id) === String(contactId))

    if (!contact) {
      return null
    }

    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = getContactById
