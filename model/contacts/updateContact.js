const getAllContacts = require('./getAllContacts')
const updateContactsList = require('./updateContactsList')

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getAllContacts()
    const index = contacts.findIndex(contact => String(contact.id) === String(contactId))
    contacts[index] = { ...contacts[index], ...body }

    if (index === -1) {
      return null
    }

    await updateContactsList(contacts)

    return contacts[index]
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateContact
