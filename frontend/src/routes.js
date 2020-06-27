import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'utils/PrivateRoute';

import { Front, Main, Register, Users } from 'pages';

const Routes = ({ isUserAuthenticated }) => {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <PrivateRoute
        path="/"
        component={Main}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        path="/users"
        component={Users}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        path="/front"
        component={Front}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
    </Switch>
  );
};

Routes.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired
};

export default Routes;
