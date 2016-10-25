/**
* The model for the hangman-online game.
*/
var db = require('../db');

// Create new game
exports.create = function(word, player, host) {
  var game = {
    word: word,
    player: player,
    host: host
  }

  //Save to the database
  db.save(game);
}

// Get a particular comment
exports.get = function(id) {
  return db.retrieve(id);
}
