const { Menu, Drink, Food } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const menus = await Menu.findAll({
                include: [
                    { association: 'restaurant' },
                    {
                        model: Drink,
                        association: 'drinks_menu',
                        include: [
                            { association: 'drink_type' },
                            { association: 'drink_kind' }
                        ]
                    },
                    {
                        model: Food,
                        association: 'foods_menu',
                        include: [
                            { association: 'food_type' },
                            { association: 'food_kind' }
                        ]
                    }
                ]
            });
            return res.status(200).json(menus);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    }
};