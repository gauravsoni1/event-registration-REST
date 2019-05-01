const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const UserSchema = new Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,validate:{
    validator:function(val){
      return validator.isEmail(val);
    },
    message:(props)=>{return "Entered email is invalid"}
  }},
  userType:{type:String,required:true},
  age:{type:Number},
  dateOfBirth:{type:Number},
  familyMembers:[Schema.Types.ObjectId],
  occupation:{type:String},
  businessName:{type:String},
  joinDate:{type: Number},
  isActiveMembership:{type:Boolean},
  isActive:{type:Boolean,default:true},
  membershipEnd:{type:Number},
  token:{
    id:String
  }
});

module.exports = mongoose.model('User',UserSchema);