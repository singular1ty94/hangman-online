var express = require('express');
var HangmanFrame = require('../models/hangmanframe');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('game');
});

/* GET the game page. */
router.get('/:id', function(req, res, next) {

  //Retrieve our game file
  HangmanFrame.findOne({'_id': req.params.id}, null, function (err, HangmanFrame){
    res.render('playgame', {
      title: 'Hangman Online',
      word: HangmanFrame.word,
      player: HangmanFrame.player,
      host: HangmanFrame.host
    });
    next();
  });

});

/* POST a new game */
router.post('/', function(req, res) {
  //Create a new frame
  HangmanFrame.create({
    word: req.body.word,
    player: req.body.player,
    host: req.body.gamehost
  }, function(err, HangmanFrame) {
    if (err){
      res.render('error', {
        message: err.message,
        error: err
      });
    }else{
      res.render('playgame', {
        title: 'Hangman Online',
        word: HangmanFrame.word,
        player: HangmanFrame.player,
        host: HangmanFrame.host
      });
    }
  });
});

module.exports = router;
