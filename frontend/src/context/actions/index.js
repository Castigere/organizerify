import auth from './auth';
import preload from './preload';
import messages from './messages';
import modal from './modal';
import submit from './submit';
import session from './session';
import user from './user';

const actionList = { auth, preload, messages, modal, submit, session, user };

/**
 * Function returning object of objects containing actions wrapped in dispatch functions.
 * It is also ghetto memoized stopping it being run every action dispatch
 * Code returned looks like this:
 *  useActions = dispatch => {
 *    return {
 *      auth: dispatch => {
 *       auth.userIsAuthenticated = data => dispatch({type: 'AUHTHENTICATE_USER', data})
 *      }
 *    }
 *  }
 * @param {Object} actionsList { auth: { authAction: 'AUTH_ACTION' } }
 * @returns [{Object},{Object}] actions, actionHistory
 */
const actionCreator = actionGroups => {
  let cache;
  const actionHistory = [];
  return dispatch => {
    if (cache) return cache;
    const actions = {};
    Object.keys(actionGroups).forEach(actionGroup => {
      actions[actionGroup] = { ...actionGroups[actionGroup] };
      if (process.env.NODE_ENV === 'development') {
        Object.keys(actionGroups[actionGroup]).forEach(action => {
          actions[actionGroup][action] = data => {
            actionHistory.push({
              group: actionGroup,
              action: actionGroups[actionGroup][action],
              data: data || null
            });
            dispatch({ type: actionGroups[actionGroup][action], data });
          };
        });
      } else {
        actionHistory.push({ action: 'No history logged in production' });
        Object.keys(actionGroups[actionGroup]).forEach(action => {
          actions[actionGroup][action] = data => {
            dispatch({ type: actionGroups[actionGroup][action], data });
          };
        });
      }
    });
    cache = [actions, actionHistory];
    return [actions, actionHistory];
  };
};

export default actionCreator(actionList);
