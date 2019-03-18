const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAttendee = function(req, res, next) {
  if (!req.body.name) {
    res.status(400).send({ error: "Please enter a name" });
    return next();
  }

  let user = new User({
    username: req.body.username,
    age: req.body.age,
    dateOfBirth: req.body.dateOfBirth,
    occupation: req.body.occupation,
    businessName: req.body.businessName,
    joinDate: req.body.joinDate,
    isActiveMembership: req.body.isActiveMembership,
    membershipEnd: req.body.membershipEnd
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Attendee added successfully !");
  });
};

exports.getAllAttendee = function(req, res) {
  User.find({}, function(err, user) {
    res.send(user);
  });
};

exports.login = (req, res) => {
  var token = jwt.sign(
    { userId: req.userData._id, userType: req.userData.userType },
    process.env.JWT_SECRET,
    {expiresIn:'5m'}
  );
  res.status(200).send({
    userId:req.userData._id,
    authToken:token
  });
};

exports.signup = (req, res) => {
  if (req.body.isExist) {
    return res.status(400).send("User already exist");
  }
  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(req.body.password, salt);
    })
    .then(hashedPassword => {
      let user = new User({
        username: req.body.username,
        password: hashedPassword,
        userType: req.body.userType,
        email: req.body.email
      });
      return user.save();
    })
    .then(() => {
      res.status(200).send("User saved successfuly");
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.update = (req, res) => {};
