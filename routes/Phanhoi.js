module.exports = app => {
    var Phanhoi = require('../controller/Phanhoi');
    var router = require('express').Router();

    router.post("/", Phanhoi.create);
    router.get('/', Phanhoi.findall);
    router.get('/:id', Phanhoi.findone);
    router.delete('/:id', Phanhoi.delete);
    router.patch('/:id', Phanhoi.update);

    app.use("/phanhois", router);
}