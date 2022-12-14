var Food = require("../models").Food;
exports.findAll = (req, res) => {
  Food.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.create = (req, res) => {
  Food.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Food.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Food.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
