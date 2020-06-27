import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withContext from '../../context';
import { user } from '../../tasks';
// import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from '../../config';

import EmailForm from './EmailForm';
import NewAccountForm from './NewAccountForm';

// import googleLogo from '../assets/logo_google.svg';
// import facebookLogo from '../assets/logo_facebook.svg';
// import emailLogo from '../assets/logo_email.svg';

import './loginForm.css';

const LoginForm = ({ isSubmitting }) => {
  const [accountType, setAcccountType] = useState(false);

  const accountLookup = async values => {
    const type = await user.getUserAccountType(values);
    setAcccountType(type);
  };

  return (
    <div className="login-form-container">
      {!accountType && <EmailForm isSubmitting={isSubmitting} accountLookup={accountLookup} />}
      {accountType && !accountType.exists && (
        <NewAccountForm isSubmitting={isSubmitting} accountLookup={accountLookup} />
      )}
    </div>
  );
};

LoginForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};

const mapStateToProps = (_, selectors, state) => {
  return {
    isSubmitting: selectors.submit.getSubmitStatus(state)
  };
};

export default withContext(LoginForm, mapStateToProps);
