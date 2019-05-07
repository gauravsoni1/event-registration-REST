const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const UserSchema = new Schema({
  salutation:{type:String},
  firstName:{type:String},
  lastName:{type:String},
  mobileNumber:{type:Number},
  uaeState:{type:String},
  indiaState:{type:String},
  emiratesID:{type:Number},
  selfEmployed:{type:Boolean,default:false},
  username:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,validate:{
    validator:function(val){
      return validator.isEmail(val);
    },
    message:(props)=>{return "Entered email is invalid"}
  }},
  userType:{type:String,required:true},
  dateOfBirth:{type:Number},
  familyMembers:[Schema.Types.ObjectId],
  designation:{type:String},
  companyName:{type:String},
  joinDate:{type: Number},
  isActiveMembership:{type:Boolean},
  isActive:{type:Boolean,default:true},
  membershipEnd:{type:Number},
  token:{
    id:String
  }
});

module.exports = mongoose.model('User',UserSchema);