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
