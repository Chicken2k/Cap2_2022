const Image = require('../models').Image;
const getAll = async (req, res) => {
    try {
        const { id } = req.params;
        let data;
        data = await Image.findAll({
            where: {
                restaurantId: id
            },
            attributes: ['link']
        });
        data = data.map(item => item.link);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log('err: ', error);
        res.status(500).json({
            success: false,
            msg: 'NOT FOUND IMAGES'
        })
    }
}

module.exports = {
    getAll
}