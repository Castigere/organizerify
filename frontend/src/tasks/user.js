import { mutations, queries } from '../graphql';
import { actions } from '../context/store';
import errorHandling from './utils';

const tasks = {
  signUpUser: args => {
    actions.submit.setSubmitting();
    mutations
      .signUpUser(args)
      .then(user => {
        actions.auth.userIsAuthenticated();
        actions.user.setLoggedInUser(user.data.signUpUser);
        actions.submit.setSubmittingDone();
      })
      .catch(err => errorHandling(err));
  },
  createUser: args => {
    actions.submit.setSubmitting();
    return mutations
      .createUser(args)
      .then(user => {
        actions.submit.setSubmittingDone();
        return user;
      })
      .catch(err => errorHandling(err));
  },
  loginUser: args => {
    actions.submit.setSubmitting();
    return mutations
      .loginUser(args)
      .then(user => {
        actions.auth.userIsAuthenticated();
        actions.user.setLoggedInUser(user.data.loginUser);
        actions.submit.setSubmittingDone();
        return user;
      })
      .catch(err => errorHandling(err));
  },
  logoutUser: () => {
    actions.submit.setSubmitting();
    mutations
      .logoutUser()
      .then(() => {
        actions.auth.logOutUser();
        actions.user.setLoggedInUser(null);
        actions.session.setSessionInactive();
        actions.submit.setSubmittingDone();
      })
      .catch(err => errorHandling(err));
  },
  getCurrentUser: () => {
    queries
      .getCurrentUser()
      .then(user => {
        actions.auth.userIsAuthenticated();
        actions.user.setLoggedInUser(user.data.getCurrentUser);
      })
      .catch(err => errorHandling(err));
  },
  getUserById: args => {
    return queries
      .getUserById(args)
      .then(user => {
        actions.messages.addMessage(user);
        return user;
      })
      .catch(err => errorHandling(err));
  },
  getUserAccountType: args => {
    return queries
      .getUserAccountType(args)
      .then(accountType => {
        return accountType.data.getUserAccountType;
      })
      .catch(err => errorHandling(err));
  }
};

export default tasks;
