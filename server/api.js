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

// router.get("/functions", (req, res) => {
//   // empty selector means get all documents
//   Func.find({}).then((functions)=> res.send(functions));
// });

// router.post("/function", (req, res) => {
//   const newFunction = new Func({
//     _id: data.functions.length,
//     creator_name: 'lol',
//     exp: req.body.exp,
//     leftRange: req.body.leftRange,
//     rightRange: req.body.rightRange,
//   });
//   newFunction.save().then((func) => res.send(func));
// });
router.get("/functions", (req, res) => {
  // empty selector means get all documents
  func.find({}).then((funcs)=> res.send(funcs));
  });
  
router.post("/function", auth.ensureLoggedIn, (req, res) => {
  const newFunction = new Func({
  _id: 1,
  creator_name: "lol",
  exp: req.user.exp,
  leftRange: req.user.leftRange,
  rightRange: req.user.righRange,
  });
  
newFunction.save().then((functioninput) => res.send(functioninput));
  });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
