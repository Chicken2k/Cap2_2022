const News = require("../models").News;
const Restaurant = require("../models").Restaurant;

getAll = async (req, res) => {
  try {
    const news = await News.findAll({
      where: {
        status: true,
      },
      include: [{ model: Restaurant }],
    });
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
getOne = (req, res) => {
  News.findOne({ where: { id: req.params.id }, include: [Restaurant] })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
createNews = async (req, res) => {
  try {
    console.log("req body: ", req.body);
    const news = await News.create(req.body);
    return res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  getAll,
  getOne,
  createNews,
};
