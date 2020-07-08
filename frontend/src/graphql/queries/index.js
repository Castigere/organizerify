import getCurrentUser from './getCurrentUser';
import getUserById from './getUserById';
import getUserAccountType from './getUserAccountType';
import getSessionStatus from './getSessionStatus';
import getEmailAvailability from './getEmailAvailability';

import { apolloClient } from '../apolloClient';

const queryList = {
  getCurrentUser,
  getUserById,
  getUserAccountType,
  getSessionStatus,
  getEmailAvailability
};

const queryCreator = items => {
  const queries = {};
  Object.keys(items).forEach(e => {
    queries[e] = args =>
      apolloClient.query({
        query: items[e],
        variables: args
      });
  });
  return queries;
};

export default queryCreator(queryList);
