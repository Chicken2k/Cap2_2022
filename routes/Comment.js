module.exports = (app) => {
  var Comment = require("../controller/Comment");
  var router = require("express").Router();

  router.post("/", Comment.create);
  router.get("/", Comment.findall);
  router.get("/:id", Comment.findone);

  app.use("/v1/comment", router);
};
