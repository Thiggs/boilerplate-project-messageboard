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

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  board: String,
  type: String,
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: { type: Boolean, default: false },
  delete_password: String,
  replies: []
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
  board: board,
  type: "post",
  text: inputs.text,
  created_on: Date.now(),
  bumped_on: Date.now(),
  reported: false,
  delete_password: inputs.delete_password,
  replies:  []
    })
  message.save();
  //    res.redirect('/b/'+inputs.board)
      res.send(message)
  }
  })
  
  .get(function (req, res){
    var board = req.params.board;
    Message.find({board: board, type:"post"}, {
      board: 0,
      type: 0,
      reported: 0,
      delete_password: 0,
      replies: { $slice: -3 },
      "replies.reported": 0,
      "replies.delete_password": 0
      }, 
      { sort: { 'bumped_on' : -1 }, limit: 10 }, 
      function(err, post) {
        if (err) {
        res.send(err);
      } else {
      res.send(post);
      }
});
    })
  
  .put(function (req, res){
        var board = req.params.board;
    var inputs = req.query;
    if(!inputs.thread_id){
      res.send("please fill out required fields")
    }
    else{
      Message.findByIdAndUpdate(inputs.thread_id, {
        reported: true,
      }, {new: true}, 
      function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send("success");
      }
    }); 
    }
  })
  
        .delete(function (req, res){
    var board = req.params.board;
    var inputs = req.query;
    if(!inputs.thread_id||!inputs.delete_password){
      res.send("please fill out required fields")
    }
    else{
      Message.findOneAndDelete({_id: inputs.thread_id, delete_password: inputs.delete_password},
      function(err, result) {
      if (err) {
        res.send("incorrect password");
      } 
        else {
        res.send("success");
      }
    }); 
    }
  });
    
  app.route('/api/replies/:board')
  .post(function (req, res){
      var board = req.params.board;
      var inputs = req.body;
       if(!inputs.text||!inputs.delete_password||!inputs.thread_id){
      res.send("please fill out required fields")
    }
    else{
  var reply=new Message({
  board: board,
  type: "reply",
  text: inputs.text,
  created_on: Date.now(),
  bumped_on: Date.now(),
  reported: false,
  delete_password: inputs.delete_password,
  replies:  []
    })
  reply.save();
      
 Message.findByIdAndUpdate(inputs.thread_id, {
        $push: {replies: reply}, 
        bumped_on: Date.now(),
      }, {new: true}, 
      function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    }
  })
  //    res.redirect('/b/'+inputs.board)

    .get(function (req, res){
    var board = req.params.board;
    var inputs = req.query;
    if(!inputs.thread_id){
      res.send("please fill out required fields")
    }
    else{
    Message.find({_id: inputs.thread_id}, {
      board: 0,
      type: 0,
      reported: 0,
      delete_password: 0,
      "replies.reported": 0,
      "replies.delete_password": 0
      }, 
      { }, 
      function(err, post) {
        if (err) {
        res.send(err);
      } else {
      res.send(post);
      }
});
    }
    })
  
    .put(function (req, res){
    var board = req.params.board;
    var inputs = req.query;
    if(!inputs.thread_id||!inputs.reply_id){
      res.send("please fill out required fields")
    }
    else{
      Message.updateOne({"_id": inputs.thread_id, "replies._id":inputs.reply_id}, 
                     {$set: {'replies.$.reported':'true'}},
                     {}, function(err,result){
        if(err){console.log (err)}
      })
      Message.findByIdAndUpdate(inputs.reply_id, {
        reported: true,
      }, {new: true}, 
      function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send("success");
      }
    }); 
    }
  })
      .delete(function (req, res){
    var board = req.params.board;
    var inputs = req.query;
    if(!inputs.thread_id||!inputs.reply_id||!inputs.delete_password){
      res.send("please fill out required fields")
    }
    else{
      Message.updateOne({"_id": inputs.thread_id, "replies._id":inputs.reply_id, "delete_password": inputs.delete_password}, 
                     {$set: {replies: ["deleted"]}},
                     {}, function(err,result){
        if(err){console.log(err)}
      })
      Message.findOneAndDelete({_id: inputs.reply_id, delete_password: inputs.delete_password},
      function(err, result) {
      if (err) {
        res.send("incorrect password");
      } else {
        res.send("success");
      }
    }); 
    }
  });
};
