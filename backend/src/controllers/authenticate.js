const passport = require('passport');
import { AUTH_SUCCESS_REDIRECT_URL } from '../config';

/**
 * GOOGLE AUTHENTICATE
 */
exports.authenticateGoogle = () => {
  return (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: AUTH_SUCCESS_REDIRECT_URL,
      failureRedirect: '/register'
    })(req, res, next);
  };
};

/**
 * FACEBOOK AUTHENTICATE
 */
exports.authenticateFacebook = () => {
  return (req, res, next) => {
    passport.authenticate('facebook', {
      scope: 'email',
      successRedirect: AUTH_SUCCESS_REDIRECT_URL,
      failureRedirect: '/register'
    })(req, res, next);
  };
};
