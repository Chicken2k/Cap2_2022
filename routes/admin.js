module.exports = app => {
    var Restaurant = require('../controller/Admin');
    var router = require('express').Router();
    router.patch('/restaurant/:id', Restaurant.changeStatusRestaurant);

    app.use('/v1/admin', router);
}