const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cart.Controller.js');
const loggerMiddleware = require('../Utilties/middleware');

router.route('/add-to-cart').post(loggerMiddleware, cartController.addToCart);
router.route('/remove-from-cart').delete(loggerMiddleware, cartController.removeFromCart);
router.route('/view-cart').get(loggerMiddleware, cartController.viewCart);

module.exports = router;