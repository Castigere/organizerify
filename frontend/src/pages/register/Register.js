import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import withContext from 'context';

import Stepper from 'components/stepper';

const Register = ({ history }) => {
  return (
    <div className="">
      <Stepper basePath="/register" history={history} />
    </div>
  );
};

Register.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

const mapStateToProps = () => ({});

export default withContext(Register, mapStateToProps);
