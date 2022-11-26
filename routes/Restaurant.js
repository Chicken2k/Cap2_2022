module.exports = app => {
    const restaurant = require('../controller/Restaurant');
    const router = require('express').Router();

    router.get('/', restaurant.getRestaurantsByUserId);
    router.post('/', restaurant.createRestaurant);
    router.patch('/:id', restaurant.updateRestaurant);
    router.delete('/:id', restaurant.deleteRestaurant);

    app.use('/v1/restaurants', router);
}