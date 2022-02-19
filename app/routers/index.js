const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.route('/user')
    .get(userController.getAll);

router.get('/', (_, res) => {
    res.json({
        message: "API Stan",
        author: "PARMENTIER Sébastien"
    });
});

module.exports = router;