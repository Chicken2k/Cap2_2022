var Phanhoi = require('../models').Phanhoi;
exports.create = (req, res) => {
    Phanhoi.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    Phanhoi.findAll().then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}               
exports.findone = (req, res) => {
    Phanhoi.findOne({where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Phanhoi.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Phanhoi.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
