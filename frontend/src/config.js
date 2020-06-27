const api = 'api';
const defaultLanguage = 'en';
const herokuUrl = 'https://infinite-basin-21969.herokuapp.com';
const devUrl = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  exports.host = herokuUrl;
  exports.GOOGLE_AUTH_ENDPOINT = `${herokuUrl}/${api}/auth/google`;
  exports.FACEBOOK_AUTH_ENDPOINT = `${herokuUrl}/${api}/auth/facebook`;
} else if (process.env.NODE_ENV === 'development') {
  exports.host = devUrl;
  exports.GOOGLE_AUTH_ENDPOINT = `${devUrl}/${api}/auth/google`;
  exports.FACEBOOK_AUTH_ENDPOINT = `${devUrl}/${api}/auth/facebook`;
}

exports.api = api;
exports.defaultLanguage = defaultLanguage;
