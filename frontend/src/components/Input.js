import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

const firstError = errors => errors[0].message;

const Input = ({ name, value, onChange, onBlur, errors, type, description, disabled }) => (
  <div className="input-container">
    <div className="input-description">{description}</div>
    <div>
      <input
        className={errors.length > 0 ? 'input input-validation-error' : 'input'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        disabled={disabled}
      />
      <div className="input-status">herst</div>
    </div>
    <div className="input-error">{errors.length > 0 && firstError(errors)}</div>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

Input.defaultProps = {
  onBlur: () => {},
  errors: [{}],
  type: 'text',
  disabled: false
};

export default Input;
