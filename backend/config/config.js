if (process.env.NODE_ENV === 'production') {
  exports.appName = process.env.APPLICATION_NAME;
  exports.api = process.env.API_VERSION;
  exports.host = process.env.HOST;
  exports.mongoDb = process.env.MONGODB_URI;
  exports.port = process.env.PORT;
  exports.sessionSecret = process.env.SESSION_SECRET;
  exports.facebookAuth = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `https://${process.env.HOST}${process.env.API_VERSION}${process.env.FACEBOOK_CALLBACK_URL}`
  };
  exports.googleAuth = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://${process.env.HOST}${process.env.API_VERSION}${process.env.GOOGLE_CALLBACK_URL}`
  };
} else if (process.env.NODE_ENV === 'development') {
  const host = 'localhost';
  const port = 8080;
  const appName = 'mike';
  const cookiePrefix = 'aaa_organizerify';
  const api = '/api';
  const mongoDb = `mongodb://${host}/${appName}`;
  const sessionSecret = 'H3mligereEnnDetteBlirDetIkke!';
  const facebookAuth = {
    clientID: '161152641139386',
    clientSecret: 'f4fcc284ffce7ba6f801c5a1dce9fc62',
    callbackURL: `http://${host}:${port}/api/auth/facebook/callback`
  };
  const googleAuth = {
    clientID: '875753535027-dgjg6e4l5qp9qhlvvj9r4htb6rugjpnp.apps.googleusercontent.com',
    clientSecret: 'YiHNdF458DRxME1hHwUIfzQL',
    callbackURL: `http://${host}:${port}/api/auth/google/callback`
  };
  module.exports = {
    host,
    port,
    appName,
    api,
    mongoDb,
    sessionSecret,
    facebookAuth,
    googleAuth,
    cookiePrefix
  };
}
