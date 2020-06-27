import React, { createContext, useReducer } from 'react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';

import { initialState, rootReducer } from '../reducers';
import useActions from '../actions';
import selectors from '../selectors';
import stateDebugger from '../../utils/stateDebugger';

const StoreContext = createContext(initialState);
const history = createBrowserHistory();

// eslint-disable-next-line import/no-mutable-exports
let actions;
let actionHistory;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  [actions, actionHistory] = useActions(dispatch);
  if (process.env.NODE_ENV === 'development') {
    stateDebugger(state, actionHistory);
  }
  return (
    <StoreContext.Provider value={{ actions, selectors, state, history }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { StoreContext, StoreProvider, actions };
