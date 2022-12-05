module.exports = (app) => {
  var Reply = require("../controller/Reply");
  var router = require("express").Router();

  router.post("/", Reply.create);
  router.get("/", Reply.findall);
  router.get("/:id", Reply.findone);

  app.use("/v1/reply", router);
};
