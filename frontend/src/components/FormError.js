import React from 'react';
import PropTypes from 'prop-types';

import './formError.css';

const errorMessage = errors =>
  errors.map(({ message, id }) => {
    return <div key={id}>{message}</div>;
  });

const FormError = ({ errors }) => {
  return <div>{errors.length > 0 && errorMessage(errors)}</div>;
};

FormError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormError;
