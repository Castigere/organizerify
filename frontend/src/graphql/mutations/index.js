import createUser from './createUser';
import loginUser from './loginUser';
import logoutUser from './logoutUser';
import signUpUser from './signUpUser';
import updateUser from './updateUser';

import { apolloClient } from '../apolloClient';

const mutations = { createUser, loginUser, logoutUser, signUpUser, updateUser };

const wrapper = items => {
  const newItems = {};
  Object.keys(items).forEach(e => {
    newItems[e] = args =>
      apolloClient.mutate({
        mutation: items[e],
        variables: args
      });
  });
  return newItems;
};

export default wrapper(mutations);
