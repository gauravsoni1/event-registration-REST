const Attendee = require('../models/attendee.model');

exports.createAttendee = function(req,res,next){

  if (!req.body.name){
    res.status(400).send({"error":"Please enter a name"});
    return next();
  };

  let attendee = new Attendee({
    name:req.body.name,
    age:req.body.age,
    dateOfBirth:req.body.dateOfBirth,
    occupation:req.body.occupation,
    businessName:req.body.businessName,
    joinDate:req.body.joinDate,
    isActiveMembership:req.body.isActiveMembership,
    membershipEnd:req.body.membershipEnd
  });

  attendee.save(function(err){
    if (err){
      return next(err);
    }
    res.send("Attendee added successfully !");
  });
};


exports.getAllAttendee = function(req,res){
  Attendee.find({},function(err,user){
    res.send(user);
  });

}