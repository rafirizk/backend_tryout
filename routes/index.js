const ProductRoutes = require('./productRoutes')
const KaryawanRoutes = require('./karyawanRoutes')
const AuthRoutes = require('./authRoutes')
const ProductsRoutes = require('./ProductsRoutes')
const MongoRoutes = require('./mongoRoutes')
const MongooseRoutes = require('./mongooseRoutes')

module.exports = {
    ProductRoutes,
    KaryawanRoutes,
    AuthRoutes,
    ProductsRoutes,
    MongoRoutes,
    MongooseRoutes,
    SocketRoutes: require('./socketRoutes')
}