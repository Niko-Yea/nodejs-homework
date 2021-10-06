const { Contact } = require('../../model')
const { NotFound } = require('http-errors')
const { isValidObjectId } = require('mongoose')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  if (!isValidObjectId(contactId)) {
    throw new NotFound('Not found')
  }
  const isContactDeleted = await Contact.findByIdAndDelete(contactId)

  if (!isContactDeleted) {
    throw new NotFound('Not found')
  }

  res.json({ message: 'contact deleted' })
}

module.exports = deleteContact
