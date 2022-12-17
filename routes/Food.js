module.exports = (app) => {
  var food = require("../controller/Food");
  var router = require("express").Router();

  router.get("/", food.findAll);
  router.post("/", food.create);
  router.patch("/:id", food.update);
  router.delete("/:id", food.delete);

  app.use("/v1/food", router);
};
