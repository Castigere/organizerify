const API_VERSION = 'api';
const PORT = '8080';
const HOSTNAME = window.location.hostname;
const PROTOCOL = window.location.protocol;
const FACEBOOK_AUTH_ENDPOINT = `${PROTOCOL}//${HOSTNAME}:${PORT}/${API_VERSION}/auth/facebook`;
const GOOGLE_AUTH_ENDPOINT = `${PROTOCOL}//${HOSTNAME}:${PORT}/${API_VERSION}/auth/google`;

export { API_VERSION, HOSTNAME, PROTOCOL, FACEBOOK_AUTH_ENDPOINT, GOOGLE_AUTH_ENDPOINT };
