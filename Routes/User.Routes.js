const express = require("express");
const { createUser, ActivateUser, LoginUser } = require("../Controller/User.Controller");
const loggerMiddleware = require("../Utilties/middleware");
const router = express.Router();

router.route('/register').post(loggerMiddleware, createUser);
router.route('/activate').post(loggerMiddleware, ActivateUser);
router.route('/login').post(loggerMiddleware, LoginUser);
module.exports = router;
