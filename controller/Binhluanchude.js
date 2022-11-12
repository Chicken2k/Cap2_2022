var Binhluanchude = require('../models').Binhluanchude;
var Binhluan = require("../models").Binhluan;
var Chude = require("../models").Chude;
exports.create = (req, res) => {
    Binhluanchude.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    Binhluanchude.findAll({ include: [{ model: Binhluan, attributes: ['id', 'binhluan', 'scoreApi','analyzeComment'] }, { model: Chude, attributes: ['id', 'chuDe'] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    Binhluanchude.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Binhluanchude.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Binhluanchude.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
