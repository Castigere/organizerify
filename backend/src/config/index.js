const APPLICATION_NAME = process.env.APPLICATION_NAME;
const API_VERSION = process.env.API_VERSION;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const FACEBOOK_CALLBACK_URL =
  process.env.NODE_ENV === 'development'
    ? `http://${process.env.HOST}:${process.env.PORT}/${process.env.API_VERSION}/auth/facebook/callback`
    : `https://${process.env.HOST}${process.env.API_VERSION}/auth/facebook/callback`;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL =
  process.env.NODE_ENV === 'development'
    ? `http://${process.env.HOST}:${process.env.PORT}/${process.env.API_VERSION}/auth/google/callback`
    : `https://${process.env.HOST}/${process.env.API_VERSION}/auth/google/callback`;
const QUERY_LIMIT = 100;
const DUMMY_CONSTANT = 1337;
const COOKIE_PREFIX = `aaa${APPLICATION_NAME}`;
const NODE_ENV = process.env.NODE_ENV;
const CORS_ORIGIN = NODE_ENV === 'production' ? `https://${HOST}:${PORT}` : 'http://localhost:3000';
const SESSION_COOKIE_SECURE = NODE_ENV === 'production';
const SESSION_COOKIE_SAMESITE = NODE_ENV === 'production';

export {
  APPLICATION_NAME,
  API_VERSION,
  HOST,
  PORT,
  DATABASE_URI,
  SESSION_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  QUERY_LIMIT,
  DUMMY_CONSTANT,
  COOKIE_PREFIX,
  NODE_ENV,
  CORS_ORIGIN,
  SESSION_COOKIE_SECURE,
  SESSION_COOKIE_SAMESITE
};
