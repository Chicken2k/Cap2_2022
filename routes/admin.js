module.exports = (app) => {
  var Restaurant = require("../controller/admin");
  const News = require("../controller/admin");
  var router = require("express").Router();

  router.get("/restaurants", Restaurant.getAllRestaurant);
  router.get("/restaurant/:id", Restaurant.getRestaurantById);
  router.patch("/restaurant/:id", Restaurant.updateRestaurant);

  router.get("/news", News.getNews);
  router.patch("/news/:id", News.updateNews);
  router.delete("/news/:id", News.deleteNews);
  app.use("/v1/admin", router);
};
