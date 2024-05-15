const express = require('express');
const router = express.Router();
const itemController = require("../Controller/item.controller.js");
const loggerMiddleware = require('../Utilties/middleware.js');

router.route("/").post(loggerMiddleware, itemController.createItem);
router.route("/").get(loggerMiddleware, itemController.getAllItems);
router.route("/").delete(loggerMiddleware, itemController.deleteItem);
router.route("/:id").put(loggerMiddleware, itemController.updateItem);

//router.post('/', itemController.createItem);
//router.get('/', itemController.getAllItems);
//router.delete('/', itemController.deleteItem);
//router.put('/:id', itemController.updateItem);

module.exports = router;