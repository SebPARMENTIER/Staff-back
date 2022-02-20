const { Card, Drink, Food } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const cards = await Card.findAll({
                include: [
                    { association: 'restaurant' },
                    {
                        model: Drink,
                        association: 'drinks_card',
                        include: [
                            { association: 'drink_type' },
                            { association: 'drink_kind' }
                        ]
                    },
                    {
                        model: Food,
                        association: 'foods_card',
                        include: [
                            { association: 'food_type' },
                            { association: 'food_kind' }
                        ]
                    }
                ]
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