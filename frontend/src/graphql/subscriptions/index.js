import commentCreated from './commentCreated';
import subscriptionHandler from './subscriptionHandler';
import subscriptionLogger from '../../utils/subscriptionLogger';

import { apolloClient } from '../apolloClient';

const subscriptionList = { commentCreated };

const subscriptionCreator = items => {
  const subscriptions = {};
  Object.keys(items).forEach(e => {
    if (process.env.NODE_ENV === 'development') {
      subscriptions[e] = args =>
        apolloClient
          .subscribe({
            query: items[e],
            variables: args
          })
          .subscribe({
            next({ data }) {
              subscriptionHandler[e](data);
              subscriptionLogger(data);
            }
          });
    } else {
      subscriptions[e] = args =>
        apolloClient
          .subscribe({
            query: items[e],
            variables: args
          })
          .subscribe({
            next({ data }) {
              subscriptionHandler[e](data);
            }
          });
    }
  });
  return subscriptions;
};

export default subscriptionCreator(subscriptionList);
