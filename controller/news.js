const News = require('../models').News;

getAll = async (req, res) => {
    try {
        const news = await News.findAll({
            where: {
                status: true
            }
        });
        res.status(200).json({
            success: true,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
createNews = async (req, res) => {
    try {
        console.log('req body: ', req.body);
        const news = await News.create(req.body);
        return res.status(201).json({
            success: true,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports = {
    getAll,
    createNews
}