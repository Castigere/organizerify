const passport = require('passport');

/**
 * GOOGLE AUTHENTICATE
 */
exports.authenticateGoogle = () => {
  return (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile'],
      successRedirect: 'http://localhost:3000/',
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
      successRedirect: 'http://localhost:3000/',
      failureRedirect: '/signup'
    })(req, res, next);
  };
};
