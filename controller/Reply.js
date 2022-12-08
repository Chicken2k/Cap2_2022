var Reply = require("../models").Reply;
var Comment = require("../models").Comment;
var User = require("../models").User;
exports.create = (req, res) => {
  Reply.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  Reply.findAll({
    include: [{ model: User, attributes: ["id", "name"] }],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findone = (req, res) => {
  Reply.findAll({
    where: { restaurantId: req.params.id },
    include: [{ model: User, attributes: ["id", "name"] }],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
