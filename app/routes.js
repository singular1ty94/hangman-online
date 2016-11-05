var HangmanFrame = require('./models/HangmanFrame');

/**
* Get a game from the database.
*/
function getGame(res, id) {
  //Find the todos and sort by the text column.
  HangmanFrame.findOne({'_id': id}).exec(function(err, frame) {
    if (err) res.send(err)
    res.json(frame);
  });
};

module.exports = function(app) {

  /**
  * Creates a new HangmanFrame with data submitted from a form.
  */
  app.post('/api/hangman', function(req, res) {
    HangmanFrame.create({
      word: req.body.word,
      player: req.body.player,
      host: req.body.host,
      created: new Date().toISOString()
    }, function (err, hangman) {
      if (err){
        res.send(err);
      }

      //Load the game.
      getGame(res, hangman._id);
    });

  });

 /**
  * Joins an existing hangman game
  */
  app.post('/api/hangman/join', function(req, res) {
    HangmanFrame.findOneAndUpdate({'_id': req.body.id}, { host: req.body.host }, {}, function(err, hangman){
      if (err){
        //res.send(err);
        console.log(err);
      }

      //Load the game.
      getGame(res, req.body.id);
    });
  });

  /**
  * Deletes a HangmanFrame from the database.
  */
  app.delete('/api/hangman/:game_id', function(req, res) {
    HangmanFrame.remove({
      _id: req.params.game_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      getTodos(res);
    });
  });

  /** Get the homepage of the app. */
  app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
