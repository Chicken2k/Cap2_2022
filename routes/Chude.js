module.exports = app => {
    var Chude = require('../controller/Chude');
    var router = require('express').Router();

    router.post("/", Chude.create);
    router.get('/', Chude.findall);
    router.get('/:id', Chude.findone);
    router.delete('/:id', Chude.delete);
    router.patch('/:id', Chude.update);

    app.use("/chudes", router);
}