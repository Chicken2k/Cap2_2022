module.exports = app => {
    var Binhluanchude = require('../controller/Binhluanchude');
    var router = require('express').Router();

    router.post("/", Binhluanchude.create);
    router.get('/', Binhluanchude.findall);
    router.get('/:id', Binhluanchude.findone);
    router.delete('/:id', Binhluanchude.delete);
    router.patch('/:id', Binhluanchude.update);

    app.use("/binhluanchudes", router);
}