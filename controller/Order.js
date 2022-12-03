var Order = require("../models").Order;
exports.findAll = (req, res) => {
  Order.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.create = (req, res) => {
  console.log(req.body);
  Order.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
