module.exports = app => {
    const restaurant = require('../controller/Restaurant');
    const news = require('../controller/news');
    const router = require('express').Router();

    router.get('/', news.getAll);
    router.post('/', news.createNews);

    app.use('/v1/news', router);
}