import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from 'utils';

import { Front, Main, Register, Users, NewUser, NotFound, UserRegistration, Login } from 'pages';

const Routes = ({ isUserAuthenticated }) => {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <PrivateRoute
        exact
        path="/userregistration"
        component={UserRegistration}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        exact
        path="/newuser"
        component={NewUser}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        exact
        path="/users"
        component={Users}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        exact
        path="/front"
        component={Front}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/register"
      />
      <PrivateRoute
        exact
        path="/"
        component={Main}
        isUserAuthenticated={isUserAuthenticated}
        redirect="/login"
      />
      <PrivateRoute
        path="*"
        component={NotFound}
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
