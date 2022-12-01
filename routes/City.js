module.exports = (app) => {
  var city = require("../controller/City");
  var router = require("express").Router();

  router.get("/", city.findAll);

  app.use("/v1/cities", router);
};
