const express = require('express')
const router = express.Router()

const { controllerWrapper, authenticate } = require('../../middlewares')

const contactsCtrl = require('../../controllers/contacts')

router.get('/', authenticate, controllerWrapper(contactsCtrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(contactsCtrl.getById))

router.post('/', authenticate, controllerWrapper(contactsCtrl.addContact))

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(contactsCtrl.deleteContact),
)

router.patch(
  '/:contactId',
  authenticate,
  controllerWrapper(contactsCtrl.updateContact),
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  controllerWrapper(contactsCtrl.updateStatusContact),
)

module.exports = router
