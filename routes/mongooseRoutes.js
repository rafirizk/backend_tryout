const Router = require('express').Router()
const {MongooseController} = require('../controllers')

Router.get('/', MongooseController.get)

module.exports = Router