const { Contact } = require('../../model')
const { NotFound, BadRequest } = require('http-errors')
const { joiSchemaPatch } = require('../../model/contacts')
const { isValidObjectId } = require('mongoose')

const updateStatusContact = async (req, res) => {
  const { error } = joiSchemaPatch.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const { contactId } = req.params

  if (!isValidObjectId(contactId)) {
    throw new NotFound('Not found')
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing field favorite')
  }

  if (!result) {
    throw new NotFound('Not found')
  }

  res.json(result)
}

module.exports = updateStatusContact
