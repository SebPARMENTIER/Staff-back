const { Card, Drink, Food } = require('../models');
const { sequelize } = require('../models/card');
const { QueryTypes } = require('sequelize');

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
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const card = await Card.findByPk(id, {
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

            if(!card) {
                return res.status(404).json({
                    data: [],
                    error: "Cette ressource est introuvable"
                });
            }

            return res.status(200).json(card);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    createCard: async (req, res) => {
        try {
            const card = await Card.create(req.body);

            return res.status(200).json({
                card
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    updateCard: async (req, res) => {
        try {
            const { id, title, description, restaurant_id } = req.body;

            const card = await Card.findByPk(id);

            if(!card) {
                return res.status(404).json({
                    data: [],
                    error: "Card non trouvée"
                });
            };

            if (!id) {
                return res.status(403).json({
                    data: [],
                    error: "Pas autorisé"
                });
            };

            await card.update({
                title,
                description,
                restaurant_id
            });

            return res.json({
                card
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    deleteCard: async (req, res) => {
        try {
            const { id } = req.params;

            const card = await Card.findByPk(id);

            if (!card) {
                return res.status(404).json({
                    data: [],
                    error: "Card non trouvée"
                });
            };

            await card.destroy();

            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    addFoodOnCard: async (req, res) => {
        try {
            const { card_id, food_id } = req.body;

            await sequelize.query(`INSERT INTO "card_has_food" ("card_id", "food_id") VALUES (${card_id}, ${food_id})`, {type: QueryTypes.INSERT });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    addDrinkOnCard: async (req, res) => {
        try {
            const { card_id, drink_id } = req.body;

            await sequelize.query(`INSERT INTO "card_has_drink" ("card_id", "drink_id") VALUES (${card_id}, ${drink_id})`, {type: QueryTypes.INSERT });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    deleteFoodOnCard: async (req, res) => {
        try {
            const { card_id, food_id } = req.body;

            await sequelize.query(`DELETE FROM "card_has_food" WHERE "card_id"=${card_id} AND "food_id"=${food_id}`, {type: QueryTypes.DELETE });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    deleteDrinkOnCard: async (req, res) => {
        try {
            const { card_id, drink_id } = req.body;

            await sequelize.query(`DELETE FROM "card_has_drink" WHERE "card_id"=${card_id} AND "drink_id"=${drink_id}`, {type: QueryTypes.DELETE });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    }
};