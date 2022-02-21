const { Food, Food_kind, Food_type } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const foods = await Food.findAll({
                include: [
                    {
                        model: Food_kind,
                        association: 'food_kind',
                    },
                    {
                        model: Food_type,
                        association: 'food_type',
                    }
                ]
            });
            return res.status(200).json(foods);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    addFood: async (req, res) => {
        try {
            const food = await Food.create(req.body);

            return res.status(200).json({
                food
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    updateFood: async (req, res) => {
        try {
            const { id, title, description, price, food_type_id, food_kind_id } = req.body;

            const food = await Food.findByPk(id);

            if(!food) {
                return res.status(404).json({
                    data: [],
                    error: "Food non trouvée"
                });
            };

            if (!id) {
                return res.status(403).json({
                    data: [],
                    error: "Pas autorisé"
                });
            };

            await food.update({
                title,
                description,
                price,
                food_type_id,
                food_kind_id
            });

            return res.json({
                food
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    deleteFood: async (req, res) => {
        try {
            const { id } = req.body;

            const food = await Food.findByPk(id);

            if (!food) {
                return res.status(404).json({
                    data: [],
                    error: "Food non trouvée"
                });
            };

            await food.destroy();

            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    }
};