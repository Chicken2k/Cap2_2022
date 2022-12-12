var Order = require("../models").Order;
const User = require("../models").User;
const Restaurant = require("../models").Restaurant;
const ResponseString = require("../constants/error");
const mailjet = require("../shared/mailjetService");
const checkUserHave = async (userId) => {
  try {
    const data = await Order.findOne({ where: { userId } });
    return data;
  } catch (err) {
    console.log(err);
  }
};
exports.findAll = async (req, res) => {
  // Lấy list lịch sử đặt bàn của user
  const { userId, status } = req.query;
  let whereObj = { status: false };
  if (!userId || !(await checkUserHave(userId)))
    return res.status(200).json({
      success: true,
      data: [],
    });
  if (userId && (await checkUserHave(userId)) && status)
    whereObj = { ...whereObj, userId, status: Boolean(status) };
  try {
    const data = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name", "address"],
        },
      ],
      where: whereObj,
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

exports.update = async (req, res) => {
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
    };
    await Order.update(body, {
      where: {
        id: id,
      },
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
      msg: ResponseString.ORDER_RESTAURANT_CONFIRMED,
    });
  } catch (error) {
    console.log('error nè trời: ', error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({
      success: true,
      msg: ResponseString.ORDER_RESTAURANT_REJECTED,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getOrderRestaurant = async (req, res) => {
  try {
    // Lấy danh sách đặt bàn bên trang quản lý restaurant
    const { userId } = req.query;
    const data = await Order.findAll({
      include: {
        model: Restaurant,
        where: {
          userId,
        },
      },
      where: { status: false },
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

exports.getOrderPending = async (req, res) => {
  // Lấy list lịch sử đặt bàn của user
  const { userId } = req.query;
  let whereObj = { status: false };
  if (!userId || !(await checkUserHave(userId)))
    return res.status(200).json({
      success: true,
      data: [],
    });
  if (userId && (await checkUserHave(userId)))
    whereObj = { ...whereObj, userId };
  try {
    const data = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name", "address"],
        },
      ],
      where: whereObj,
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
