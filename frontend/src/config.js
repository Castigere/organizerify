const API_VERSION = 'api';
const HOSTNAME = window.location.hostname;
const PROTOCOL = window.location.protocol;
const WEBSOCKET_PROTOCOL = HOSTNAME === 'localhost' ? 'ws:' : 'wss:';
const PORT = HOSTNAME === 'localhost' ? '8080' : '443';
const FACEBOOK_AUTH_ENDPOINT = `${PROTOCOL}//${HOSTNAME}:${PORT}/${API_VERSION}/auth/facebook`;
const GOOGLE_AUTH_ENDPOINT = `${PROTOCOL}//${HOSTNAME}:${PORT}/${API_VERSION}/auth/google`;

export {
  API_VERSION,
  HOSTNAME,
  PROTOCOL,
  FACEBOOK_AUTH_ENDPOINT,
  GOOGLE_AUTH_ENDPOINT,
  PORT,
  WEBSOCKET_PROTOCOL
};
