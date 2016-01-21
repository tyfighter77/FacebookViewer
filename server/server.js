//Dependencies
var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    config = require('./config.js');

//
var app = express(),
    port = 3000;

app.use(express.static(__dirname + '/../public'));
app.use(expressSession(config.express));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy(config.facebook, function(token, refreshToken, profile, done){
  //connect to our database
  done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#/home',
  failureRedirect: '/#/login'
}));
app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/#/login');
});

app.get('/auth/current', function(req, res){
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});



app.listen(port, function() {
  console.log('Server is running on port ' + port);
});
