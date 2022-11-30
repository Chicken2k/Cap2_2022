module.exports = app => {
    var Restaurant = require('../controller/Admin');
    var router = require('express').Router();

    router.get('/restaurants', Restaurant.getAllRestaurant);
    router.patch('/restaurant/:id', Restaurant.updateRestaurant);

    app.use('/v1/admin', router);
}