module.exports = (app) => {
  var city = require("../controller/City");
  var router = require("express").Router();

  router.get("/", city.findAll);
  router.post("/", city.create);
  router.patch("/:id", city.update);
  router.delete("/:id", city.delete);
  app.use("/v1/cities", router);
};
