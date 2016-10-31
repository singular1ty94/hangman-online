/**
* The model for the hangman-online game.
*/
var mongoose = require('mongoose');

module.exports = mongoose.model('HangmanFrame', {
  word: {
    type: String,
    default: ''
  },
  player:{
    type: String,
    default: ''
  },
  host:{
    type: String,
    default: ''
  }
});
