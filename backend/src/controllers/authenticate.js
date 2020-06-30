const passport = require('passport');

/**
 * GOOGLE AUTHENTICATE
 */
exports.authenticateGoogle = () => {
  console.log('hey ho');
  return (req, res, next) => {
    console.log('requet!');
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
