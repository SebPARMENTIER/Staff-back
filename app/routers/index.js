const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');
const cardController = require('../controllers/card');
const menuController =  require('../controllers/menu');
const foodController = require('../controllers/food');
const drinkController = require('../controllers/drink');

router.route('/user')
    .get(userController.getAll);

router.route('/card')
    .get(cardController.getAll)
    .post(cardController.addCard);

router.route('/card/:id(\\d+)')
    .get(cardController.getById);

router.route('/card/:id(\\d+)/food')
    .post(cardController.addFoodOnCard);

router.route('/card/:id(\\d+)/drink')
    .post(cardController.addDrinkOnCard);

router.route('/menu')
    .get(menuController.getAll);

router.route('/food')
    .get(foodController.getAll)
    .post(foodController.addFood);

router.route('/food/:id(\\d+)')
    .patch(foodController.updateFood)
    .delete(foodController.deleteFood);

router.route('/drink')
    .get(drinkController.getAll)
    .post(drinkController.addDrink);

router.route('/drink/:id(\\d+)')
    .patch(drinkController.updateDrink)
    .delete(drinkController.deleteDrink);

router.get('/', (_, res) => {
    res.json({
        message: "API Stan",
        author: "PARMENTIER Sébastien"
    });
});

module.exports = router;