const express = require('express');
const router = express.Router();
const requestController = require('../Controller/Request.Controller.js');
const loggerMiddleware = require('../Utilties/middleware.js');

router.route('/').post(loggerMiddleware, requestController.createRequest);
router.route('/').get(loggerMiddleware, requestController.getAllRequests);
router.route('/:id').put(loggerMiddleware, requestController.approveRequest);

module.exports = router;