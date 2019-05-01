const Event = require("../models/event.model");
const userMiddleware = require("../middleware/user.middleware");

module.exports.addEvent = (req, res) => {
  const event = new Event({
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    eventDescription: req.body.eventDescription
  });
  event.save(function(err, document) {
    if (err) {
      res.status(400).send({ error: "Invalid Input" });
    } else {
      res.status(200).send(document);
    }
  });
};

module.exports.getEvents = (req, res) => {
  Event.find({}, function(err, event) {
    res.send(event);
  });
};

module.exports.getEvent = (req,res)=>{
  Event.findById(req.query._id,function(err,result){
    if(err || !req.query._id){
      res.status(400).send({error:"Invalid Input"});
    }else{
      res.status(200).send(result);
    }
  })
  
}


module.exports.updateEvent = (req, res) => {
  let updateObject = {
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventDate: req.body.eventDate
  };
  for (let item in updateObject){
    if(!updateObject[item])
    delete updateObject[item];
  };  

  console.log('req',req.body);

  Event.findOneAndUpdate(
    { _id: req.body._id },updateObject,
    { new: true },
    (err, doc) => {
      console.log('doc',doc);
      if (err) {
        res.status(400).send({});
      } else {
        res.status(200).send(doc);
      }
    },
    e => {
      console.log(e);
    }
  );
};

module.exports.deleteEvent = (req, res) => {
  Event.findByIdAndDelete(req.body._id, err => {
    if (err) {
      res.status(400).send({ error: "Invalid Input" });
    } else {
      res.status(200).send({ result: "success" });
    }
  });
};
