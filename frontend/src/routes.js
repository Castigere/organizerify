import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, getURLSearchParam } from 'utils';

import { Front, Main, Users, NewUser, NotFound, UserRegistration, Signup } from 'pages';

const Routes = ({ isUserAuthenticated, userStatus }) => {
  const userStatusIncomplete = userStatus === 'incomplete';
  const userStatusActive = userStatus === 'active';
  const { pathname, search } = new URL(window.location.href);
  const loginURL = `/signup?url=${pathname}${search.replace('?', '&')}`;
  const redirectURL = `${getURLSearchParam('url')}`;
  const urlParam = getURLSearchParam('url');

  console.log('redirectURL', redirectURL);
  console.log('urlParam', urlParam);
  console.log('isUserAuth', isUserAuthenticated);
  console.log('userStatusActive', userStatusActive);
  console.log('userStatusIncomplete', userStatusIncomplete);
  console.log('search', search);

  const debugURL = new URL(window.location.href).searchParams;
  console.log(debugURL);

  // Grab contextpath if user is not fetching userregistration so that we can redirect to original url once
  // registration is complete, otherwise just add query string to redirect url
  // const userRegistrationURL = pathname.includes('userregistration')
  //   ? `/userregistration${search}`
  //   : `/userregistration?url=${pathname}${search}`;

  const userRegistrationURL = `/userregistration${search}`;

  console.log(
    'userRegistration pathname includes userregistration',
    pathname.includes('userregistration')
  );
  console.log('Userreg', userRegistrationURL);

  return (
    <>
      <Route path="*">
        {isUserAuthenticated && userStatusActive && urlParam && <Redirect to={redirectURL} />}
        {userStatusIncomplete && <Redirect from="*" to={userRegistrationURL} />}
      </Route>
      <Switch>
        {!isUserAuthenticated && <Route path="/signup" component={Signup} />}
        {userStatusIncomplete && <Route path="/userregistration" component={UserRegistration} />}
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
    </>
  );
};

Routes.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  userStatus: PropTypes.string.isRequired
};

export default Routes;
