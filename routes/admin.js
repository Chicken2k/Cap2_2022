module.exports = app => {
    var Restaurant = require('../controller/Admin');
    const News = require('../controller/admin');
    var router = require('express').Router();

    router.get('/restaurants', Restaurant.getAllRestaurant);
    router.get('/restaurant/:id', Restaurant.getRestaurantById);
    router.patch('/restaurant/:id', Restaurant.updateRestaurant);

    router.get('/news', News.getNews);
    router.patch('/news/:id', News.updateNews);
    app.use('/v1/admin', router);
}