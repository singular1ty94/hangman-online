//A faux database
var dbgame = [];

//Save the game data to the faux database.
exports.save = function(game){
  dbgame.push({ word: game.word, player: game.player, host: game.host});
}

//Retrieve the matching data model
exports.retrieve = function(id){
  var game = {
    word: dbgame[id].word,
    player: dbgame[id].player,
    host: dbgame[id].host
  }
  return game;
}
