import passport from 'passport';
import { AUTH_SUCCESS_REDIRECT_URL } from '../config';

/**
 * GOOGLE AUTHENTICATE
 */
exports.authenticateGoogle = () => {
  return (req, res, next) => {
    req.session.originalReferer = req.query.url;
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: req.query.url,
      failureRedirect: '/login'
    })(req, res, next);
  };
};

exports.authenticateGoogleCallback = () => {
  return (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: `${AUTH_SUCCESS_REDIRECT_URL}${req.session.originalReferer}`,
      failureRedirect: '/login'
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
      failureRedirect: '/login'
    })(req, res, next);
  };
};
