const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var UserMiddleware = {};

//validates if the user exist in the database

UserMiddleware.isUserExist = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(data => {
      data.length > 0 ? (req.body.isExist = true) : (req.body.isExist = false);
      next();
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
};

// Validates the username and password
// Return the user object if the username and password is validated

UserMiddleware.validateUsernamePassword = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(data => {
      req.userData = data[0];
      return bcrypt.compare(req.body.password, data[0].password);
    })
    .then(data => {
      if (data === false) {
        return res.status(400).send("Wrong username or password");
      }
      //TODO: Remove this later
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    })
    .catch(err => {
      res.status(400).send("Wrong username or password");
    });
};

//Validate the token if its valid

UserMiddleware.validateToken = (req, res, next) => {
  if (!req.body.token) {
    return res.status(401).send("Unauthorized");
  }
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    //TODO: Remove this later
    res.setHeader("Access-Control-Allow-Origin", "*");
    req.userData = decodedToken;
    next();
  });
};

UserMiddleware.addCORS = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = UserMiddleware;
