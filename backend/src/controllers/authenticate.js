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
    const successRedirectURL = () => {
      const {
        session: { originalReferer, signupEmail }
      } = req;
      console.log(originalReferer, signupEmail);
      if (originalReferer === '' && signupEmail === '') return `${AUTH_SUCCESS_REDIRECT_URL}`;
      if (originalReferer.length > 0 && signupEmail === '')
        return `${AUTH_SUCCESS_REDIRECT_URL}?url=${originalReferer}`;
      if (originalReferer.length === '' && signupEmail.length > 0)
        return `${AUTH_SUCCESS_REDIRECT_URL}/?email=${signupEmail}`;
      if (originalReferer.length > 0 && signupEmail.length > 0)
        return `${AUTH_SUCCESS_REDIRECT_URL}?url=${originalReferer}&email=${signupEmail}`;
    };
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: successRedirectURL(),
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
