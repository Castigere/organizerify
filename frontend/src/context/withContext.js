import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { StoreContext } from './store';

const withContext = (Component, mapStateToProps = () => {}, options = { history: false }) => {
  const C = props => {
    return (
      <StoreContext.Consumer>
        {({ actions, history, selectors, state }) => {
          const allProps = {
            ...props,
            ...mapStateToProps(state, selectors, actions),
            ...(options.history ? history : null)
          };
          return <Component {...allProps} />;
        }}
      </StoreContext.Consumer>
    );
  };
  return hoistNonReactStatics(C, Component);
};

export default withContext;
