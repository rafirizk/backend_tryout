const Router = require('express').Router()
const {MongoControllers} = require('./../controllers')
const {auth} = require('./../helpers/auth')

Router.get('/', MongoControllers.getdata)
Router.post('/', MongoControllers.adddata)

module.exports = Router