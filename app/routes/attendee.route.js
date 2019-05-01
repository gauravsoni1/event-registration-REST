const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/user.middleware');
const userController = require('../controllers/user.controller');

router.post("/create",userMiddleware.validateToken, userController.createAttendee);

router.get("/getAll",userMiddleware.validateToken, userController.getAllAttendee);

router.post('/archive',userMiddleware.validateToken, userController.archiveUser);

router.post('/update',userMiddleware.validateToken, userController.update);

module.exports = router;