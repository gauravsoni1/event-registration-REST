const express = require("express");
const router = express.Router();

const attendeeController = require("../controllers/attendee.controller");

/**
 * @api {post} /attendee/create Create a new Attendee
 * @apiVersion 0.1.0
 * @apiName CreateAttendee
 * @apiGroup Attendee
 *
 * @apiParam {String} name Name of the person
 * @apiParam {Number} [age] Age of the person 
 * @apiParam {String} occupation Occupation of the person
 * @apiParam {String} [businessName] Name of the business person is working in
 * @apiParam {Date} [dateOfBirth] Date of Birth of the person
 * @apiParam {Date} [joinDate] Joining date of person in the group
 * 
 *
 * @apiSuccess {String} Success
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200 OK
 *
 * @apiError incorrectData The required data is not entered
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
         "error": "Please enter a name"
        }
 */

router.post("/create", attendeeController.createAttendee);

router.get("/getAll", attendeeController.getAllAttendee);

module.exports = router;
