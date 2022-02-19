const { User } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    }
};