const ResponseString = require("../constants/error");
const Restaurant = require("../models").Restaurant;
const User = require("../models").User;
const News = require("../models").News;
const Image = require("../models").Image;

getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      attributes: ["id", "name", "description", "address", "phoneNumber"],
      where: {
        status: false,
      },
      include: [{ model: User }],
    });
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      attributes: ["id", "name", "description", "address", "phoneNumber"],
      where: {
        id: id,
        status: false,
      },
    });
    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      success: false,
      msg: error.msg,
    });
  }
};
getAllRestaurantManage = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: User }, { model: Image }],
    });
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
getAllNewManage = async (req, res) => {
  try {
    const restaurants = await News.findAll({
      include: [
        { model: Restaurant, attributes: ["id", "name", "address"] },
        { model: User },
      ],
    });
    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const statusObj = {
      status: status,
    };
    await Restaurant.update(statusObj, {
      where: {
        id: id,
      },
    });
    res.status(201).json({
      success: true,
      msg: ResponseString.POST_APPROVED,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      success: false,
      msg: ResponseString.POST_REJECTED,
    });
  }
};

getNews = async (req, res) => {
  try {
    const data = await News.findAll({
      where: {
        status: false,
      },
      include: [
        { model: Restaurant, attributes: ["id", "name", "address"] },
        { model: User },
      ],
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const body = {
      status: true,
    };
    const news = await News.update(body, {
      where: {
        id: id,
      },
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
deleteNews = (req, res) => {
  News.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

deleteRestaurant = (req, res) => {
  Restaurant.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
module.exports = {
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  getNews,
  updateNews,
  deleteNews,
  deleteRestaurant,
  getAllRestaurantManage,
  getAllNewManage,
};
