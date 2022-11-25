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
        console.log('run here?');
        res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
};

createRestaurant = async (req, res) => {
    try {
        const { restaurant }  = req.body;
        console.log('Create restaurant', req.body);
        console.log('restaurant nè: ', restaurant);
        res.status(201).json({
            successful: true,
            data: 'Create restaurant successfully'
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
};