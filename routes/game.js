var express = require('express'),
    game = require('../models/game'),
    db = require('../db');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('game');
  next();
});

/* GET the game page. */
router.get('/:id', function(req, res, next) {

  //Retrieve our game file
  var gameFile = game.get(req.params.id);
  res.render('playgame', {
    title: 'Hangman Online',
    word: gameFile.word,
    player: gameFile.player,
    host: gameFile.host
  });
  next();
});

/* POST a new game */
router.post('/', function(req, res, next) {
  word = req.body.word;
  host = req.body.host;
  player = req.body.player;

  //Create the new game file.
  game.create(word, player, host);
  res.redirect("/game");
});

module.exports = router;
