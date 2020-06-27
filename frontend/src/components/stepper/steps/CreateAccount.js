import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './loginForm.css';

const CreateAccount = ({
  onChange,
  email,
  password,
  confirmedPassword,
  passwordError,
  confirmedPasswordError,
  onEnter
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <div className="center">
      <h3>CREATE NEW ACCOUNT</h3>
      <h3>{email}</h3>
      Emter password
      <div className="login-frontpage-login-field">
        <input
          className="login-frontpage-email"
          ref={inputRef}
          type="password"
          name="password"
          autoComplete="password"
          spellCheck={false}
          onChange={({ target: { value, name } }) =>
            onChange({ password: value, confirmedPassword }, name)
          }
          value={password}
        />
        <div className="login-frontpage-login-field">{passwordError}</div>
        <div className="login-frontpage-login-field">Confirm password</div>
        <input
          className="login-frontpage-email"
          disabled={!password}
          type="password"
          name="confirmedPassword"
          autoComplete="confirmedPassword"
          spellCheck={false}
          onChange={({ target: { value, name } }) =>
            onChange({ confirmedPassword: value, password }, name)
          }
          value={confirmedPassword}
          onKeyPress={onEnter}
        />
        <div className="login-frontpage-login-field">{confirmedPasswordError}</div>
        <div className="login-frontpage-login-field" />
      </div>
    </div>
  );
};

CreateAccount.defaultProps = {
  passwordError: false,
  confirmedPasswordError: ''
};

CreateAccount.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmedPassword: PropTypes.string.isRequired,
  passwordError: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.bool]),
  confirmedPasswordError: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
};

export default CreateAccount;
