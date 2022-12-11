const News = require("../models").News;
const Restaurant = require("../models").Restaurant;

getAll = async (req, res) => {
  try {
    const { userId } = req.query;
    const whereObj = {};
    if (userId) whereObj = { userId };
    const news = await News.findAll({
      where: whereObj,
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
getNewsRestaurant = async (req, res) => {
  try {
    // Lấy danh sách đặt bàn bên trang quản lý restaurant
    const { userId } = req.query;
    console.log(userId);
    const data = await News.findAll({
      where: {
        userId,
      },
      include: [{ model: Restaurant }],
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
module.exports = {
  getAll,
  getOne,
  createNews,
  getNewsRestaurant,
};
