const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');
const cardController = require('../controllers/card');
const menuController =  require('../controllers/menu');
const foodController = require('../controllers/food');

router.route('/user')
    .get(userController.getAll);

router.route('/card')
    .get(cardController.getAll)
    .post(cardController.addCard);

router.route('/menu')
    .get(menuController.getAll);

router.route('/food')
    .get(foodController.getAll)
    .post(foodController.addFood);

router.route('/food/:id(\\d+)')
    .patch(foodController.updateFood)
    .delete(foodController.deleteFood);

router.get('/', (_, res) => {
    res.json({
        message: "API Stan",
        author: "PARMENTIER Sébastien"
    });
});

module.exports = router;