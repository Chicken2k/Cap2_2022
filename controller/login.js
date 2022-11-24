require("dotenv").config()
const User = require('../models').User;
const jwt = require('jsonwebtoken')
const Role = require("../models").Role;
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findAll({
        include: Role,
        where: { email: email, password: password }
    }).then(data => {
        if (data[0] !== undefined && data.length !== 0) {
            var user = {
                id: data[0].dataValues.id,
                name: data[0].dataValues.name,
                email: data[0].dataValues.email,
                role: data[0].dataValues.Role.name,
            };
            var token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '10h' });
            res.json({
                token: token,
                user: user,
            });
        } else {
            res.status(204).json({
                success: false,
                message: 'USER NOT FOUND'
            })
        }
    }
    ).catch(err => {
        res.json({ err: err.message })
    })
}