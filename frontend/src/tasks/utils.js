import { actions } from '../context/store';
import { message } from '../containers/Messaging';

const errorHandling = err => {
  if (err.message === 'GraphQL error: Not authenticated.') {
    actions.auth.logOutUser();
    actions.session.setSessionInactive();
  } else {
    actions.messages.addError({ message: err.message, stack: err.stack });
    message(err.message, 'error');
  }
  actions.submit.setSubmittingDone();
  return Promise.reject(err.message);
};

export default errorHandling;
