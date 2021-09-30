const updateContactsList = require('./updateContactsList')
const getAllContacts = require('./getAllContacts')

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const newList = contacts.filter(contact => String(contactId) !== String(contact.id))

    await updateContactsList(newList)

    if (contacts.length !== newList.length) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact
