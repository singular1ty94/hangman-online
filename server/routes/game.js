var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Game = require('../models/game.js');

/**
 * Create a new game
 */
router.post('/create', function(req, res) {

  //Create a game
  Game.create(new Game({word: req.body.word}), function(err, game){
    if(err){
      return res.status(500).json({err: err});
    }
    return res.status(200).json({
      status: 'Game created successfully!',
      gameId: game._id
    });
  });
});

/**
 * Fetch a game
 */
router.get('/:gameId', function(req, res) {

  //Find a game
  Game.findOne({ '_id': req.params.gameId }, function(err, game){
    if(err){
      return res.status(500).json({err: err});
    }
    return res.status(200).json({
      status: 'Retrieved game succesfully!',
      game: game
    });
  });
});

module.exports = router;
