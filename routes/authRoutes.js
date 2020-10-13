const Router = require('express').Router()
const {db} = require('../connection')
const {AuthControllers} = require('../controllers')
const {auth} = require('../helpers/auth')

Router.post('/register', AuthControllers.register)
Router.post('/login', AuthControllers.login)
Router.post('/sendVerification', AuthControllers.sendVerification)
Router.get('/verification', auth, AuthControllers.verification)
Router.get('/keepLogin/:id', AuthControllers.keepLogin)

module.exports = Router