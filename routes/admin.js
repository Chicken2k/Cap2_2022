module.exports = (app) => {
  var Admin = require("../controller/admin");
  const News = require("../controller/admin");
  var router = require("express").Router();

  router.get("/restaurant/:id", Admin.getRestaurantById);
  router.patch("/restaurant/:id", Admin.updateRestaurant);
  router.delete("/restaurant/:id", Admin.deleteRestaurant);
  router.get("/restaurants", Admin.getAllRestaurant);
  router.get("/restaurants/all", Admin.getAllRestaurantManage);

  router.get("/news", Admin.getNews);
  router.get("/news/all", Admin.getAllNewManage);
  router.patch("/news/:id", Admin.updateNews);
  router.delete("/news/:id", Admin.deleteNews);
  app.use("/v1/admin", router);
};
