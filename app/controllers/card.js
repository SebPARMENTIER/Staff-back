const { Card } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const cards = await Card.findAll({
                include: 'restaurant'
            });
            return res.status(200).json(cards);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    }
};