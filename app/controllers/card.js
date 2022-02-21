const { Card, Drink, Food, card_has_food } = require('../models');
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
                    error: "Card non trouvée"
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
    addCard: async (req, res) => {
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
    addFoodOnCard: async (req, res) => {
        try {
            const { card_id, food_id } = req.body;

            const addFood = await sequelize.query(`INSERT INTO "card_has_food" ("card_id", "food_id") VALUES (${card_id}, ${food_id})`, {type: QueryTypes.INSERT });
            
            return res.status(200).json(addFood);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
};