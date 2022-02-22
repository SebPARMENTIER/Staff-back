const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user');
const cardController = require('../controllers/card');
const menuController =  require('../controllers/menu');
const foodController = require('../controllers/food');
const drinkController = require('../controllers/drink');
const errorController = require('../controllers/error');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      req.user = user;
      next();
    });
}

router.route('/user')
    .get(userController.getAll);

router.route('/signup')
    .post(userController.signup);

router.route('/login')
    .post(userController.login);

router.route('/card', authenticateToken)
    .get(cardController.getAll)
    .post(cardController.createCard)
    .patch(cardController.updateCard);

router.route('/card/:id(\\d+)', authenticateToken)
    .get(cardController.getById)
    .delete(cardController.deleteCard);

router.route('/card/:id(\\d+)/food', authenticateToken)
    .post(cardController.addFoodOnCard)
    .delete(cardController.deleteFoodOnCard);

router.route('/card/:id(\\d+)/drink', authenticateToken)
    .post(cardController.addDrinkOnCard)
    .delete(cardController.deleteDrinkOnCard);

router.route('/menu', authenticateToken)
    .get(menuController.getAll)
    .post(menuController.createMenu)
    .patch(menuController.updateMenu);

router.route('/menu/:id(\\d+)', authenticateToken)
    .get(menuController.getById)
    .delete(menuController.deleteMenu);

router.route('/menu/:id(\\d+)/food', authenticateToken)
    .post(menuController.addFoodOnMenu)
    .delete(menuController.deleteFoodOnMenu);

router.route('/menu/:id(\\d+)/drink', authenticateToken)
    .post(menuController.addDrinkOnMenu)
    .delete(menuController.deleteDrinkOnMenu);

router.route('/food', authenticateToken)
    .get(foodController.getAll)
    .post(foodController.addFood);

router.route('/food/:id(\\d+)', authenticateToken)
    .patch(foodController.updateFood)
    .delete(foodController.deleteFood);

router.route('/drink', authenticateToken)
    .get(drinkController.getAll)
    .post(drinkController.addDrink);

router.route('/drink/:id(\\d+)', authenticateToken)
    .patch(drinkController.updateDrink)
    .delete(drinkController.deleteDrink);

router.get('/', (_, res) => {
    res.json({
        message: "API Stan - Case Study",
        author: "PARMENTIER Sébastien"
    });
});

router.use(errorController.resourceNotFound);

module.exports = router;