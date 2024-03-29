/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const Func = require("./models/functioninput");

const FunctionFinishedImg = require("./models/functionFinishedImg");

const Img = require("./models/work");

const ObjectId = require('mongodb').ObjectID;

const mongodb = require('mongodb');
//initialize socket
const socketManager = require("./server-socket");


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/functions", auth.ensureLoggedIn, (req, res) => {
  // empty selector means get all documents
  Func.find({creator_id: req.user._id, workId: req.query.workId}).then((funcs)=> res.send(funcs));
  });

router.get("/works", (req, res) => {
  // empty selector means get all documents
  Img.find({}).then((funcs)=> res.send(funcs.map((func) => {
    return {creator_name: func.creator_name, data: func.data.toString('base64') }})
   )); 
  });

router.get("/savedworks", (req, res) => {
    // empty selector means get all documents
    FunctionFinishedImg.find({creator_id: req.user._id}).then((funcs)=> res.send(funcs.map((func) => {
      return {data: func.data.toString('base64'), workId: func.workId, character: func.character }})
      )); 
    });

router.get("/myworks", (req, res) => {
  // empty selector means get all documents
  Img.find({creator_id: req.user._id}).then((funcs)=> res.send(funcs.map((func) => {
    return {creator_name: func.creator_name, data: func.data.toString('base64'), workId: func.workId, _id: String(func._id)}})
    )); 
  });

router.post("/function", auth.ensureLoggedIn, (req, res) => {
  const newFunction = new Func({
  creator_id: req.user._id ,
  creator_name: req.user.name,
  exp: req.body.exp,
  leftRange: req.body.leftRange,
  rightRange: req.body.rightRange,
  workId: req.body.workId,
  origin:req.body.origin,
  mode: req.body.mode
  });
  newFunction.save().then((functioninput) => res.send(functioninput));

  });

router.post("/functiondelete", auth.ensureLoggedIn, (req) => {
  Func.deleteOne({_id:ObjectId(req.body.id)}).then((student) => console.log(req.body.id));
  });

router.post("/sdelete", auth.ensureLoggedIn, (req) => {
  FunctionFinishedImg.deleteOne({workId: req.body.workId}).then((student) => console.log(req.body.id));
  });

router.post("/worksdelete", auth.ensureLoggedIn, (req) => {
  Img.deleteOne({_id:ObjectId(req.body.id)}).then((student) => console.log(req.body.id));
  });

router.post("/saveBoard", auth.ensureLoggedIn, (req, res) => {
  var image = req.body.board;
  var data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), "base64")
  const img = new FunctionFinishedImg({
    creator_id: req.user._id ,
    creator_name: req.user.name,
    data: data,
    workId: req.body.workId,
    character: req.body.char
  })
  FunctionFinishedImg.findOne({workId: req.body.workId}).then((image) => {if (image == null) {img.save()}
  else {image.data = data; image.save()}
  })
});

router.post("/publish", auth.ensureLoggedIn, (req, res) => {
  var image = req.body.image;
  var data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), "base64")
  const img = new Img({
    creator_id: req.user._id ,
    creator_name: req.user.name,
    data: data,
  })
  img.save()
});


router.get("/imageforcoloring", (req, res) => {
  // empty selector means get all documents
  FunctionFinishedImg.find({creator_id:req.user._id, workId:req.body._workId}).then((img)=> res.send(
    {data: img.data.toString('base64') }
    )) 
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

