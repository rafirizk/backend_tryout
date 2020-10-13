const KaryawanControllers = require('./karyawanControllers')
const AuthControllers = require('./authControllers')
const ProductControllers = require('./productControllers')
const MongoControllers = require('./mongoControllers')
const MongooseController = require('./mongooseControllers')

module.exports = {
    KaryawanControllers,
    AuthControllers,
    ProductControllers,
    MongoControllers,
    MongooseController,
    SocketController: require('./socketController')
}

//dpvzckjakazlhcgl