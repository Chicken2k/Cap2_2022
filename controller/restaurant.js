const { read } = require("fs");
const ResponseString = require("../constants/error");
const Restaurant = require("../models").Restaurant;
const Image = require('../models').Image;

getAll = async (req, res) => {
  try {
    let restaurants;
    const { userId, cityId, foodId } = req.query;
    const objQuery = {};
    if (userId) objQuery.userId = userId;
    if (cityId) objQuery.cityId = cityId;
    if (foodId) objQuery.foodId = foodId;
    if (!objQuery) restaurants = await Restaurant.findAll();
    restaurants = await Restaurant.findAll({
      where: objQuery,
    });
    res.status(200).json({
      successful: true,
      data: restaurants,
    });
  } catch (error) {
    if (!error.status) res.status(500).json({ err: error });
    else
      res.status(error.status).json({
        successful: false,
        error: error.message,
      });
  }
};

getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: {
        id: id,
      },
    });
    if (!restaurant) throw new Error(ResponseString.RESTAURANT_NOT_FOUND);
    return res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
createRestaurant = async (req, res) => {
  try {
    const myData = req.body;
    const restaurant = JSON.parse(myData.information);
    const newRestaurant = await Restaurant.create(restaurant);
    const listImage = req.files;
    for(let i = 0; i < listImage.length; i++) {
      const image = {
        name: newRestaurant.name,
        link: listImage[i].path,
        description: '',
        restaurantId: newRestaurant.id
      }
      Image.create(image);
    }
    const data = {
      id: newRestaurant.id,
      name: newRestaurant.name,
    };
    res.status(201).json({
      successful: true,
      data: data,
    });
  } catch (error) {
    res.status(error.status).json({
      successful: false,
      error: error.message,
    });
  }
};

updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(201).json({
      successful: true,
      data: ResponseString.UPDATE_RESTAURANT_SUCCESSFULLY,
    });
  } catch (error) {
    res.status(error.status).json({
      successful: false,
      error: error.message,
    });
  }
};

deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({
      successful: true,
      data: ResponseString.DELETE_RESTAURANT_SUCCESSFULLY,
    });
  } catch (error) {
    res.status(error.status).json({
      successful: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
