const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { UserMongoSchema } = require('../models/userMongoSchema');
import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
} from './';

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
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: FACEBOOK_CALLBACK_URL
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'facebook.id': profile.id }, (err, user) => {
            if (err) return done(err);
            if ((user && user.status === 'active') || 'incomplete') {
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
              newUser.status = 'incomplete';
              newUser.type = 'facebook';
              newUser.language = 'en';
              newUser.logonMessage = '';
              newUser.mobileNumber = '';
              newUser.email = '';
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
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'google.id': profile.id }, (err, user) => {
            if (err) return done(err);

            if ((user && user.status === 'active') || (user && user.status === 'incomplete')) {
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
              newUser.status = 'incomplete';
              newUser.type = 'google';
              newUser.mobileNumber = '';
              newUser.email = '';
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
