var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Traveler = require('../models/traveler');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
      Traveler.findOne({'googleId': profile.id}, function(err, traveler) {
        if (err) return cb(err);
        if (traveler) {return cb(null, traveler);
        } else {
            var newTraveler = new Traveler({
                name: profile.displayName,
                googleId: profile.id
            });
            newTraveler.save(function(err) {
                if (err) return cb(err);
                return cb(null, newTraveler);
            });
        }
      });
    }
));

passport.serializeUser(function(traveler, done) {
    done(null, traveler.id);
});

passport.deserializeUser(function(id, done) {
    Traveler.findById(id, function(err, traveler) {
      done(err, traveler);
    });
});