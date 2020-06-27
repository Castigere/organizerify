import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from '../../../config';

import './loginForm.css';

const EmailForm = ({ onChange, email, errors, onEnter }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <div className="center">
      <h3>ENTER EMAIL</h3>
      <div className="login-frontpage-login-field">
        <input
          className="login-frontpage-email"
          ref={inputRef}
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          onChange={({ target: { value, name } }) => onChange({ email: value }, name)}
          value={email}
          onKeyPress={onEnter}
        />
        <div className="login-frontpage-login-field">{errors}</div>
        <div className="login-frontpage-login-field" />
        <a href={GOOGLE_AUTH_ENDPOINT}> Use google </a>
        <a href={FACEBOOK_AUTH_ENDPOINT}> Use facebook </a>
      </div>
    </div>
  );
};

EmailForm.defaultProps = {
  errors: false
};

EmailForm.propTypes = {
  email: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
};

export default EmailForm;
