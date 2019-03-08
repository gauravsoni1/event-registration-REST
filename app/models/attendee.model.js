const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  name: { type: String , required: true},
  age:{type:Number,required:true},
  dateOfBirth:{type:Number},
  occupation:{type:String},
  businessName:{type:String},
  joinDate:{type: Number},
  isActiveMembership:{type:Boolean},
  membershipEnd:{type:Number}
});

module.exports = mongoose.model('Attendee',attendeeSchema);
