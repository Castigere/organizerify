import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from 'utils';

import { Front, Main, Register, Users, NewUser, NotFound, UserRegistration, Login } from 'pages';

const Routes = ({ isUserAuthenticated }) => {
  const { pathname, search } = new URL(window.location.href);
  const redirectURL = `/login?url=${pathname}${search}`;

  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <PrivateRoute
        path="/userregistration"
        component={UserRegistration}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
      <PrivateRoute
        path="/newuser"
        component={NewUser}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
      <PrivateRoute
        path="/users"
        component={Users}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
      <PrivateRoute
        path="/front"
        component={Front}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
      <PrivateRoute
        exact
        path="/"
        component={Main}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
      <PrivateRoute
        path="*"
        component={NotFound}
        isUserAuthenticated={isUserAuthenticated}
        redirect={redirectURL}
      />
    </Switch>
  );
};

Routes.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired
};

export default Routes;
