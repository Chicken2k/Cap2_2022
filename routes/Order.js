module.exports = (app) => {
  var order = require("../controller/Order");
  var router = require("express").Router();

  router.get("/", order.findAll);
  router.get("/restaurant", order.getOrderRestaurant);
  router.get("/pending", order.getOrderPending);
  router.post("/", order.create);
  router.patch("/:id", order.update);
  router.delete("/:id", order.delete);
  app.use("/v1/order", router);
};
