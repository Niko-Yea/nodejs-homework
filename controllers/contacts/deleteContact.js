const { Contact } = require('../../model')
const { NotFound } = require('http-errors')
const checkContact = require('./checkContact')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const { _id: userId } = req.user

  const isContactBelongsToUser = await checkContact(userId, contactId)

  if (!isContactBelongsToUser) {
    throw new NotFound('Not found')
  }

  const isContactDeleted = await Contact.findByIdAndDelete(contactId)

  if (!isContactDeleted) {
    throw new NotFound('Not found')
  }

  res.json({ message: 'contact deleted' })
}

module.exports = deleteContact
