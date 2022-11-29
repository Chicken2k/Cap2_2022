const { where } = require('sequelize');
const ErrorString = require('../constants/error');
const Restaurant = require('../models').Restaurant;

getAllRestaurant = async(req, res) => {
    try {
        const restaurant = await Restaurant.findAll({
                attributes: ['id', 'name', 'description', 'address', 'phoneNumber'],
                where: {
                    status: false,
                }
            },
        )
        res.status(201).json({
            success: false,
            data: restaurant
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
updateRestaurant = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const statusObj = {
            status: status
        }
        await Restaurant.update(statusObj, {
            where: {
                id: id
            }
        });
        res.status(201).json({
            success: true,
            msg: ErrorString.POST_APPROVED
        })
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            success: false,
            msg: ErrorString.APPROVE_POST_FAIL
        })
    }
}
module.exports = {
    getAllRestaurant,
    updateRestaurant
}