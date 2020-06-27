import { subscriptions } from '../graphql';

const tasks = {
  enableAllSubscriptions: () => {
    subscriptions.commentCreated();
  },
  commentCreated: () => subscriptions.commentCreated()
};

export default tasks;
