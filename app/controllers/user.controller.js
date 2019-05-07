const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const validator = require("validator");

exports.createAttendee = function(req, res, next) {
  if (!req.body.username) {
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
    userType: "attendee",
    familyMembers: req.body.familyMembers,
    password: " ",
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
  console.log(req.body);
  User.find({}, function(err, user) {
    res.send(user);
  });
};

exports.archiveUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    { isActive: false },
    (err, doc) => {
      if (!err) {
        res.status(200).send("User successfully archived");
      } else {
        res.status(400).send("invalid data entered");
      }
    },
    err => {
      console.log(err);
    }
  );
};

exports.login = (req, res) => {
  var token = jwt.sign(
    { userId: req.userData._id, userType: req.userData.userType },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.status(200).json({
    userId: req.userData._id,
    authToken: token
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
        userType: "admin",
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

const updatedValue = (key, data) => {
  if (data[key] !== undefined) return key;
  else return null;
};

exports.update = (req, res) => {
  if (!req.body._id) {
    res.status(400).send("Invalid ID");
  } else {
    const updatedUser = {
      username: req.body.username,
      dateOfBirth: req.body.dateOfBirth,
      occupation: req.body.occupation,
      businessName: req.body.businessName,
      joinDate: req.body.joinDate,
      familyMembers: req.body.familyMembers,
      isActiveMembership: req.body.isActiveMembership,
      membershipEnd: req.body.membershipEnd
    };

    const filteredValue = _.pickBy(updatedUser, function(item) {
      return item !== undefined;
    });

    User.findByIdAndUpdate(
      req.body._id,
      filteredValue,
      { new: true },
      (err, data) => {
        if (!err) {
          res.status(200).send(data);
        } else res.status(400).send("Invalid input entered");
      }
    );
  }
};
