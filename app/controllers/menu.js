const { Menu, Drink, Food } = require('../models');
const { sequelize } = require('../models/menu');
const { QueryTypes } = require('sequelize');

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
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const menu = await Menu.findByPk(id, {
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

            if(!menu) {
                return res.status(404).json({
                    data: [],
                    error: "Menu non trouvé"
                });
            }

            return res.status(200).json(menu);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    createMenu: async (req, res) => {
        try {
            const menu = await Menu.create(req.body);

            return res.status(200).json({
                menu
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    updateMenu: async (req, res) => {
        try {
            const { id, title, description, price, restaurant_id } = req.body;

            const menu = await Menu.findByPk(id);

            if(!menu) {
                return res.status(404).json({
                    data: [],
                    error: "Menu non trouvé"
                });
            };

            if (!id) {
                return res.status(403).json({
                    data: [],
                    error: "Pas autorisé"
                });
            };

            await menu.update({
                title,
                description,
                price,
                restaurant_id
            });

            return res.json({
                menu
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    deleteMenu: async (req, res) => {
        try {
            const { id } = req.params;

            const menu = await Menu.findByPk(id);

            if (!menu) {
                return res.status(404).json({
                    data: [],
                    error: "Menu non trouvé"
                });
            };

            await menu.destroy();

            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        }
    },
    addFoodOnMenu: async (req, res) => {
        try {
            const { menu_id, food_id } = req.body;

            await sequelize.query(`INSERT INTO "menu_has_food" ("menu_id", "food_id") VALUES (${menu_id}, ${food_id})`, {type: QueryTypes.INSERT });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    addDrinkOnMenu: async (req, res) => {
        try {
            const { menu_id, drink_id } = req.body;

            await sequelize.query(`INSERT INTO "menu_has_drink" ("menu_id", "drink_id") VALUES (${menu_id}, ${drink_id})`, {type: QueryTypes.INSERT });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    deleteFoodOnMenu: async (req, res) => {
        try {
            const { menu_id, food_id } = req.body;

            await sequelize.query(`DELETE FROM "menu_has_food" WHERE "menu_id"=${menu_id} AND "food_id"=${food_id}`, {type: QueryTypes.DELETE });
            
            return res.status(200).json({ OK: true });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                data: [],
                error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement"
            });
        }
    },
    deleteDrinkOnMenu: async (req, res) => {
        try {
            const { menu_id, drink_id } = req.body;

            await sequelize.query(`DELETE FROM "menu_has_drink" WHERE "menu_id"=${menu_id} AND "drink_id"=${drink_id}`, {type: QueryTypes.DELETE });
            
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