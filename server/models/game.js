//Game model
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Schema = mongoose.Schema;

var Game = new Schema({
  player: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  host: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  word: {
    type: String,
    uppercase: true
  }
});

module.exports = mongoose.model('Game', Game);
