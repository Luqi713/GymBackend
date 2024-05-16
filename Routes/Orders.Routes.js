const express = require('express');
const router = express.Router();
const orderController = require("../Controller/Order.Controller.js");
const loggerMiddleware = require('../Utilties/middleware.js');


router.route('/place-order').post(loggerMiddleware, orderController.placeOrder);
router.route('/').get(loggerMiddleware, orderController.getAllOrders);

module.exports = router;