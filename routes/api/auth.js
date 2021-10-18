const express = require('express')
const router = express.Router()

const { controllerWrapper, authenticate } = require('../../middlewares')

const authCtrl = require('../../controllers/users')

router.post('/signup', controllerWrapper(authCtrl.signup))

router.post('/login', controllerWrapper(authCtrl.login))

router.post('/logout', authenticate, controllerWrapper(authCtrl.logout))

router.get('/current', authenticate, controllerWrapper(authCtrl.current))

module.exports = router
