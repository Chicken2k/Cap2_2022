var Order = require("../models").Order;
const User = require('../models').User;
const Restaurant = require('../models').Restaurant;
const ResponseString = require('../constants/error');
const mailjet = require('../shared/mailjetService');

exports.findAll = async(req, res) => {
  try {
    const data = await Order.findAll({
      attributes: ['id', 'status', 'date', 'note', 'quantity'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Restaurant,
          attributes: ['id', 'name', 'address']
        }
      ],
      where: {
        status: false,
      }
    })
    return res.status(200).json({
      success: true,
      data: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};
exports.create = (req, res) => {
  Order.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      res.status(500).json({
        success: false,
        msg: er.message
      })
    });
};

exports.update = async(req, res) => {
  try {
    const { id } = req.params;  
    const { userId } = req.body;
    console.log('userId: ', userId);
    const order = await Order.findOne({
      where: {
        id: id
      },
      attributes: ['restaurantId']
    })
    const restaurant = await Restaurant.findOne({
      where: {
        id: order.dataValues.restaurantId
      },
      attributes: ['userId']
    });
    const userRestaurant = await User.findOne({
      where: {
        id: restaurant.dataValues.userId
      },
      attributes: ['name', 'email']
    })
    const body = {
      status: true,
    }
    await Order.update(body, {
      where: {
        id: id
      }
    });
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['name', 'email']
    });
    await mailjet.sendMail(userRestaurant.dataValues, user.dataValues);
    res.status(201).json({
      success: true,
      msg: ResponseString.ORDER_RESTAURANT_CONFIRMED
    })
  } catch (error) {
    console.log('error nè trời: ', error);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}

exports.delete = async(req, res) => {
  try {
    const { id } = req.params;
    await Order.destroy({
      where: {
        id: id
      }
    })
    res.status(201).json({
      success: true,
      msg: ResponseString.ORDER_RESTAURANT_REJECTED
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}