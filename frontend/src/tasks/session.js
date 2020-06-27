import { queries } from '../graphql';
import { actions } from '../context/store';
import errorHandling from './utils';

const tasks = {
  prepareApp: () => {
    queries
      .getSessionStatus()
      .then(session => {
        if (session.data.getSessionStatus.isSessionActive) {
          queries
            .getCurrentUser()
            .then(user => {
              actions.auth.userIsAuthenticated();
              actions.user.setLoggedInUser(user.data.getCurrentUser);
              actions.preload.appIsReady();
            })
            .catch(err => errorHandling(err));
        } else {
          actions.preload.appIsReady();
        }
      })
      .catch(err => errorHandling(err));
  },
  isSessionActive: () => {
    queries
      .getSessionStatus()
      .then(session => {
        if (session.data.getSessionStatus.isSessionActive) {
          actions.session.setSessionActive();
        } else {
          actions.session.setSessionInactive();
        }
      })
      .catch(err => errorHandling(err));
  }
};

export default tasks;
