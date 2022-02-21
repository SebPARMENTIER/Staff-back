const { User } = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
};

module.exports = {
    getAll: async (_, res) => {
        try {
            const users = await User.findAll({
                include: [
                    { association: 'restaurant'},
                    {association: 'job'}
                ]
            });
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    signup: async (req, res) => {
        try {
            const { email, password, name, firstname, restaurant_id, job_id } = req.body;
    
            if (password.length < 8) {
                return res.status(400).json({
                data: [],
                error: "Password trop court : min 8 caractères"
                });
            };
    
            const emailIsTaken = await User.findOne({
                where: {
                email: {
                    [Op.iLike]: email,
                },
                },
            });
    
            if (emailIsTaken) {
                return res.status(400).json({
                    data: [],
                    error: "L'email est déjà utilisé"
                });
            };
        
            const user = new User({
                email,
                password: bcrypt.hashSync(password, 7),
                name,
                firstname,
                restaurant_id,
                job_id
            });
            
            await user.save();
        
            return res.json({
                data: user,
                isCreateUserSuccess: true
            });
        
            } catch (error) {
            console.error(error);
            return res.status(500).send({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    }
};