/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: { type: Boolean, default: false },
  delete_password: String,
  replies: [String]
});

var Message = mongoose.model("Message", messageSchema);

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .post(function (req, res){
      var board = req.params.board;
      var inputs = req.body;
       if(!inputs.text||!inputs.delete_password){
      res.send("please fill out required fields")
    }
    else{
      var message=new Message({
  text: inputs.text,
  created_on: Date.now(),
  bumped_on: Date.now(),
  reported: false,
  delete_password: inputs.delete_password,
  replies:  []
    })
      console.log(message)
  message.save;
  //    res.redirect('/b/'+inputs.board)
      res.send(message)
  }
  })
    
  app.route('/api/replies/:board');

};
