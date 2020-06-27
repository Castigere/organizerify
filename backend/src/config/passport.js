const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { UserMongoSchema } = require('../models/userMongoSchema');
const { facebookAuth, googleAuth } = require('./config');

module.exports = passport => {
  /**
   * (DE) SERIALIZE USER
   */
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    UserMongoSchema.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // ///////////////////////////////////////////////////////////////////////////////////////
  // FACEBOOK LOGIN STRATEGY
  // ///////////////////////////////////////////////////////////////////////////////////////

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookAuth.clientID,
        clientSecret: facebookAuth.clientSecret,
        callbackURL: facebookAuth.callbackURL
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'facebook.id': profile.id }, (err, user) => {
            if (err) return done(err);
            if (user && user.status === 'active') {
              return done(null, user);
            } else {
              let newUser = new UserMongoSchema();
              newUser.role = 'member';
              newUser.facebook.id = profile.id;
              newUser.facebook.token = token;
              newUser.displayName = profile.displayName;
              newUser.firstName = '';
              newUser.middleName = '';
              newUser.lastName = '';
              newUser.status = 'active';
              newUser.type = 'facebook';
              newUser.language = 'en';
              newUser.logonMessage = 'incompleteProfile';
              newUser.save(err => {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // ///////////////////////////////////////////////////////////////////////////////////////
  // GOOGLE SIGNUP STRATEGY
  // ///////////////////////////////////////////////////////////////////////////////////////

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleAuth.clientID,
        clientSecret: googleAuth.clientSecret,
        callbackURL: googleAuth.callbackURL
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'google.id': profile.id }, (err, user) => {
            if (err) return done(err);
            if (user && user.status === 'active') {
              return done(null, user);
            } else {
              let newUser = new UserMongoSchema();
              newUser.role = 'administrator';
              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.displayName = profile.displayName;
              newUser.firstName = profile.name.givenName;
              newUser.middleName = '';
              newUser.lastName = profile.name.familyName;
              newUser.status = 'active';
              newUser.type = 'google';
              newUser.save(err => {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
