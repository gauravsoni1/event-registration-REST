const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.post('/create',eventController.addEvent);

router.get('/getAll',eventController.getEvents);

router.get('/getevent',eventController.getEvent);

router.delete('/delete',eventController.deleteEvent);

router.patch('/update',eventController.updateEvent);

module.exports = router;