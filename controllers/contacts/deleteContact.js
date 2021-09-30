const contactsOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const isContactDeleted = await contactsOperations.removeContact(contactId)

  if (!isContactDeleted) {
    throw new NotFound('Not found')
  }

  res.json({ message: 'contact deleted' })
}

module.exports = deleteContact
