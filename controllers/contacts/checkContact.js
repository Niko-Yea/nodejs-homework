const { isValidObjectId } = require('mongoose')
const { Contact } = require('../../model')

const checkContact = async (userId, contactId) => {
  if (!isValidObjectId(contactId)) {
    return false
  }

  const contact = await Contact.find({
    owner: userId,
    _id: contactId,
  })

  if (contact.length === 0) {
    return false
  }

  return true
}

module.exports = checkContact
