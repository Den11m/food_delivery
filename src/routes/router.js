const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const imageRoute = require('./image/get-image');
const getUser = require('./user/get-user');
const createUser = require('./user/create-user');
const handleProductsRoute = require('./products/index');

const router = {
    '/me': mainRoute,
    '/motocycle': motocycleRoute,
    '/image': imageRoute,
    '/user': getUser,
    '/users': createUser,
    '/products': handleProductsRoute,
    '/products/add-order': handleProductsRoute,
    default: mainRoute
};

module.exports = router;
