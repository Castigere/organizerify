import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isUserAuthenticated, redirect, ...children }) => (
  <Route
    {...children}
    render={props => (isUserAuthenticated ? <Component {...props} /> : <Redirect to={redirect} />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
