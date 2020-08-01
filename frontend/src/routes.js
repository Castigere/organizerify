import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PrivateRoute } from 'utils';

import { Front, Main, Users, NewUser, NotFound, UserRegistration, Signup } from 'pages';

const Routes = ({ isUserAuthenticated, userStatus }) => {
  const userStatusIncomplete = userStatus === 'incomplete';
  const { pathname, search } = new URL(window.location.href);
  const loginURL = `/signup?url=${pathname}${search}`;

  // Grab contextpath if user is not fetching userregistration so that we can redirect to original url once
  // registration is complete, otherwise just add query string to redirect url
  const userRegistrationURL = pathname.includes('userregistration')
    ? `/userregistration${search}`
    : `/userregistration?url=${pathname}${search}`;

  return (
    <Switch>
      {userStatusIncomplete && (
        <Switch>
          <Route path="/userregistration" component={UserRegistration} />
          <Redirect from="*" to={userRegistrationURL} />
        </Switch>
      )}
      <Route path="/signup" component={Signup} />
      <PrivateRoute
        path="/newuser"
        component={NewUser}
        isUserAuthenticated={isUserAuthenticated}
        redirect={loginURL}
      />
      <PrivateRoute
        path="/users"
        component={Users}
        isUserAuthenticated={isUserAuthenticated}
        redirect={loginURL}
      />
      <PrivateRoute
        path="/front"
        component={Front}
        isUserAuthenticated={isUserAuthenticated}
        redirect={loginURL}
      />
      <PrivateRoute
        exact
        path="/"
        component={Main}
        isUserAuthenticated={isUserAuthenticated}
        redirect={loginURL}
      />
      <PrivateRoute
        path="*"
        component={NotFound}
        isUserAuthenticated={isUserAuthenticated}
        redirect={loginURL}
      />
    </Switch>
  );
};

Routes.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  userStatus: PropTypes.string.isRequired
};

export default Routes;
