const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');
const cardController = require('../controllers/card');
const menuController =  require('../controllers/menu');
const foodController = require('../controllers/food');
const drinkController = require('../controllers/drink');

router.route('/user')
    .get(userController.getAll);

router.route('/signup')
    .post(userController.signup);

router.route('/login')
    .post(userController.login);

router.route('/card')
    .get(cardController.getAll)
    .post(cardController.createCard)
    .patch(cardController.updateCard);

router.route('/card/:id(\\d+)')
    .get(cardController.getById)
    .delete(cardController.deleteCard);

router.route('/card/:id(\\d+)/food')
    .post(cardController.addFoodOnCard)
    .delete(cardController.deleteFoodOnCard);

router.route('/card/:id(\\d+)/drink')
    .post(cardController.addDrinkOnCard)
    .delete(cardController.deleteDrinkOnCard);

router.route('/menu')
    .get(menuController.getAll)
    .post(menuController.createMenu)
    .patch(menuController.updateMenu);

router.route('/menu/:id(\\d+)')
    .get(menuController.getById)
    .delete(menuController.deleteMenu);

router.route('/menu/:id(\\d+)/food')
    .post(menuController.addFoodOnMenu)
    .delete(menuController.deleteFoodOnMenu);

router.route('/menu/:id(\\d+)/drink')
    .post(menuController.addDrinkOnMenu)
    .delete(menuController.deleteDrinkOnMenu);

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
        message: "API Stan - Case Study",
        author: "PARMENTIER Sébastien"
    });
});

module.exports = router;