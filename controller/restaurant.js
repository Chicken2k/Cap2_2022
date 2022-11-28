const Restaurant = require('../models').Restaurant;

getRestaurantsByUserId = async (req, res) => {
    try {
        let restaurants
        const {userId, cityId, foodId} = req.query;
        const objQuery = {};
        if(userId) objQuery.userId = userId;
        if(cityId) objQuery.cityId = cityId;
        if(foodId) objQuery.foodId = foodId;
        if(!objQuery) restaurants = await Restaurant.findAll();
        restaurants = await Restaurant.findAll({
            where: objQuery
        });
        res.status(200).json({
            successful: true,
            data: restaurants
        })
    } catch ( error) {
        if(!error.status) res.status(500).json({err: 'err'})
        else res.status(error.status).json({
            successful: false,
            error: error.message
        })
    }
};

createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
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
        await Restaurant.update(req.body, {
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