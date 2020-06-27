import { unsign } from 'cookie-signature';
import gql from 'graphql-tag';

import { sessionSecret, cookiePrefix } from './config/config';
import { SessionMongoSchema } from './models';

const findUserSession = async webSocket => {
  try {
    const signedSID =
      webSocket.upgradeReq.headers.cookie &&
      decodeURIComponent(webSocket.upgradeReq.headers.cookie.slice(cookiePrefix.length + 5));

    if (!signedSID) {
      throw 'No user session, user is not authenticated';
    }

    const SID = unsign(signedSID, sessionSecret);

    if (!SID) {
      throw 'Invalid cookie, user is not authenticated';
    }

    const session = await SessionMongoSchema.findById(SID);

    if (!session) {
      throw `SID:${SID} - No matching session found in database, user is not authenticated`;
    }

    const userInfo = JSON.parse(session.session).passport;

    if (!userInfo) {
      throw `SID:${SID} - Invalid user object, check session database`;
    }

    console.info(`SID:${SID} - User session exists, user is authenticated`);
    return {
      user: {
        _id: userInfo.user._id,
        role: userInfo.user.role
      },
      isAuthenticated: () => !!(session && session.user)
    };
  } catch (err) {
    console.error(err);
    return {
      isAuthenticated: () => false
    };
  }
};

const parseRequestName = req =>
  gql(req.source).definitions[0].selectionSet.selections[0].name.value;

export { findUserSession, parseRequestName };
