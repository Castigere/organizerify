import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './loginForm.css';

const Password = ({ onChange, enteredPassword, email, errors, onEnter }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <div className="center">
      <h3>ENTER PASSWORD</h3>
      <h3>{email}</h3>
      <div className="login-frontpage-login-field">
        <input
          className="login-frontpage-email"
          ref={inputRef}
          type="password"
          name="password"
          autoComplete="password"
          spellCheck={false}
          onChange={({ target: { value } }) =>
            onChange({ enteredPassword: value }, 'enteredPassword')
          }
          value={enteredPassword}
          onKeyPress={onEnter}
        />
        <div className="login-frontpage-login-field">{errors}</div>
        <div className="login-frontpage-login-field" />
      </div>
    </div>
  );
};

Password.defaultProps = {
  errors: false,
  onChange: () => {}
};

Password.propTypes = {
  enteredPassword: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func,
  email: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired
};

export default Password;
