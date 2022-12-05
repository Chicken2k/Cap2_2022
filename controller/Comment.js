var Comment = require("../models").Comment;
var User = require("../models").User;
exports.create = (req, res) => {
  Comment.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  Comment.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findone = (req, res) => {
  Comment.findAll({
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
