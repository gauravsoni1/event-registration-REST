const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Custom file
const user = require('./routes/user.route');
const attendee = require('./routes/attendee.route');

const app = express();

const mongoDB = process.env.MONGODB_URL || process.env.DB_URL;

//Apply the middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Initialize MongoDB

mongoose.set('useNewUrlParser', true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error'));

//Routes
app.get('/',(req,res)=>{
  res.status(200).send({
    success:"true",
    message:"Welcome to Event Registration"
  })
});

app.use('/user',user);
app.use('/attendee',attendee);

module.exports = app;