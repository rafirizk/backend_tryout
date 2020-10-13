const Router = require('express').Router()
const {ProductControllers} = require('../controllers')

Router.post('/addProd', ProductControllers.Addphoto)
Router.delete('/delete/:id', ProductControllers.deleteProd)
Router.get('/', ProductControllers.getAllProd)
Router.put('/update/:id', ProductControllers.editProd)

module.exports = Router