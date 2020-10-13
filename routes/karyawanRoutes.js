const Router = require('express').Router()
const {db} = require('../connection')
const {KaryawanControllers} = require('../controllers')

Router.get('/:id', KaryawanControllers.getkaryawanbyid)

Router.get('/', KaryawanControllers.getAllKaryawan)

Router.post('/', KaryawanControllers.postNewKaryawan)

Router.delete('/:id', KaryawanControllers.deleteKaryawan)

Router.put('/:id', KaryawanControllers.editKaryawan)

module.exports = Router