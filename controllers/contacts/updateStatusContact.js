const { Contact } = require('../../model')
const { NotFound, BadRequest } = require('http-errors')
const { joiSchemaPatchFavorite } = require('../../model/contacts/contacts')
const checkContact = require('./checkContact')

const updateStatusContact = async (req, res) => {
  const { error } = joiSchemaPatchFavorite.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const { contactId } = req.params
  const { _id: userId } = req.user

  const isContactBelongsToUser = await checkContact(userId, contactId)

  if (!isContactBelongsToUser) {
    throw new NotFound('Not found')
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  }).populate('owner', 'email')

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing field favorite')
  }

  if (!result) {
    throw new NotFound('Not found')
  }

  res.json(result)
}

module.exports = updateStatusContact
