var City = require("../models").City;
exports.findAll = (req, res) => {
  City.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
