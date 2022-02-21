const { Drink, Drink_kind, Drink_type } = require('../models');

module.exports = {
    getAll: async (_, res) => {
        try {
            const drinks = await Drink.findAll({
                include: [
                    {
                        model: Drink_kind,
                        association: 'drink_kind',
                    },
                    {
                        model: Drink_type,
                        association: 'drink_type',
                    }
                ]
            });
            return res.status(200).json(drinks);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    addDrink: async (req, res) => {
        try {
            const drink = await Drink.create(req.body);

            return res.status(200).json({
                drink
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    updateDrink: async (req, res) => {
        try {
            const { id, title, description, price, drink_type_id, drink_kind_id } = req.body;

            const drink = await Drink.findByPk(id);

            if(!drink) {
                return res.status(404).json({
                    data: [],
                    error: "Drink non trouvée"
                });
            };

            if (!id) {
                return res.status(403).json({
                    data: [],
                    error: "Pas autorisé"
                });
            };

            await drink.update({
                title,
                description,
                price,
                drink_type_id,
                drink_kind_id
            });

            return res.json({
                drink
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    deleteDrink: async (req, res) => {
        try {
            const { id } = req.params;

            const drink = await Drink.findByPk(id);

            if (!drink) {
                return res.status(404).json({
                    data: [],
                    error: "Drink non trouvée"
                });
            };

            await drink.destroy();

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