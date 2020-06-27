import { authReducer, auth } from './auth';
import { preloadReducer, preload } from './preload';
import { messagesReducer, messages } from './messages';
import { modalReducer, modal } from './modal';
import { submitReducer, submit } from './submit';
import { sessionReducer, session } from './session';
import { userReducer, user } from './user';

const initialState = { auth, preload, messages, modal, submit, session, user };
const reducers = {
  authReducer,
  preloadReducer,
  messagesReducer,
  modalReducer,
  submitReducer,
  sessionReducer,
  userReducer
};

/**
 * rootReducer returns object of reducers, in the following format:
 * auth: reducer.authReducer(state.auth, action)
 */
const rootReducer = (state, action) => {
  const newItems = {};
  Object.keys(reducers).forEach(reducer => {
    const shortName = reducer.replace('Reducer', '');
    newItems[shortName] = reducers[reducer](state[shortName], action);
  });
  return newItems;
};

export { initialState, rootReducer };
