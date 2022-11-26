const Restaurant = require('../models').Restaurant;

getRestaurantsByUserId = async (req, res) => {
    try {
        const {userId} = req.query;
        const restaurants = await Restaurant.findAll({
            where: {
                userId: userId,
            }
        });
        res.status(200).json({
            successful: true,
            data: restaurants
        })
    } catch ( error) {
        res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
};

createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body.body);
        const data = {
            id: newRestaurant.id,
            name: newRestaurant.name,
        }
        res.status(201).json({
            successful: true,
            data: data
        })
    } catch (error) {
        res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
}

updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        await Restaurant.update(req.body.body, {
            where: {
                id: id
            }
        })
        res.status(201).json({
            successful: true,
            data: 'Update restaurant successfully'
        })
    } catch (error) {
        res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
}

deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        await Restaurant.destroy({
            where: {
                id: id
            }
        })
        res.status(201).json({
            successful: true,
            data: 'Delete restaurant successfully'
        })
    } catch (error) {
        res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
}

module.exports = {
    getRestaurantsByUserId,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};