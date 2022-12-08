const multer  = require('multer');
const upload = require('../config/dinaryConfig');
module.exports = app => {
    const restaurant = require('../controller/Restaurant');
    const router = require('express').Router();

    router.get('/', restaurant.getAll);
    router.get('/:id', getRestaurantById);
    router.post('/', upload.upload.array('image', 10), restaurant.createRestaurant);
    router.patch('/:id', restaurant.updateRestaurant);
    router.delete('/:id', restaurant.deleteRestaurant);

    app.use('/v1/restaurants', router);
}