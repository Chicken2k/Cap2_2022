module.exports = app => {
    const restaurant = require('../controller/Restaurant');
    const router = require('express').Router();

    router.get('/', restaurant.getRestaurantsByUserId);
    router.post('/', restaurant.createRestaurant);

    app.use('/v1/restaurants', router);
}