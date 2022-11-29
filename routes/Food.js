module.exports = (app) => {
  var food = require("../controller/Food");
  var router = require("express").Router();

  router.get("/", food.findAll);

  app.use("/v1/food", router);
};
