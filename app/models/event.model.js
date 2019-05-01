const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const Event = new Schema({
  eventName:{type:String,required:true},
  eventDate:{type:Number},
  eventDescription:{type:String},
  registered:{type:Number},
  attended:{type:Number},
});

module.exports = mongoose.model('Event',Event);