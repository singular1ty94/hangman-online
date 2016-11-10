var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Game = require('../models/game.js');

/**
 * Register a new user.
 */
router.post('/register', function(req, res) {

  //Create a user registration function via Passport
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
        username: req.body.username
      });
    });
  });
});

/**
 * Login a user.
 */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

/**
 * Logout a user
 */
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

/**
 * Get the status of a user.
 */
router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    user: req.user
  });
});

module.exports = router;
