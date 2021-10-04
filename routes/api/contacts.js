const express = require('express')
const router = express.Router()

const { controllerWrapper } = require('../../middlewares')

const ctrl = require('../../controllers/contacts')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.deleteContact))

router.patch('/:contactId', controllerWrapper(ctrl.updateContact))

router.patch(
  '/:contactId/favorite',
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
