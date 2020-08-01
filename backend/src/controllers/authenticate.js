import passport from 'passport';
import { AUTH_SUCCESS_REDIRECT_URL } from '../config';

/**
 * GOOGLE AUTHENTICATE
 */
exports.authenticateGoogle = () => {
  return (req, res, next) => {
    const {
      query: { url, email }
    } = req;
    req.session.originalReferer = url ? url : '';
    req.session.signupEmail = email ? email : '';
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: req.query.url,
      failureRedirect: '/signup'
    })(req, res, next);
  };
};

exports.authenticateGoogleCallback = () => {
  return (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: `${AUTH_SUCCESS_REDIRECT_URL}${req.session.originalReferer}/?email=${req.session.signupEmail}`,
      failureRedirect: '/signup'
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
