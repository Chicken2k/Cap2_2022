module.exports = (app) => {
    var Image = require('../controller/image');
    var router = require("express").Router();
  
    router.get('/:id', Image.getAll);
    app.use("/v1/image", router);
  };
  