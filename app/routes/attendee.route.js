const express = require('express');
const router = express.Router();


const attendeeController = require('../controllers/attendee.controller');

router.post('/create',attendeeController.createAttendee);

router.get('/getAll',attendeeController.getAllAttendee);

module.exports = router;