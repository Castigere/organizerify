import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import withContext from 'context';
import { getURLSearchParam } from 'utils';
import { user } from 'tasks';
import { REGEXP_EMAIL } from 'utils';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import PersonalInformationForm from './PersonalInformationForm';
import PasswordChangeForm from './PasswordChangeForm';

const UserRegistration = ({
  currentUser: { id, firstName, middleName, lastName, email, mobileNumber, type }
}) => {
  const [newEmail] = useState(getURLSearchParam('email'));
  /**
   * Update user with sign up email if missing
   */
  useEffect(() => {
    email === '' &&
      newEmail &&
      REGEXP_EMAIL.test(newEmail) &&
      user.updateCurrentUser({
        email: newEmail,
        id,
        firstName,
        middleName,
        lastName,
        mobileNumber
      });
  }, [newEmail, email, id, firstName, middleName, lastName, mobileNumber]);

  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <PersonalInformationForm
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        email={email === '' ? newEmail : email} // Hack to get correct email to show first render
        mobileNumber={mobileNumber}
        id={id}
      />
      {type === 'local' && <PasswordChangeForm id={id} closed />}
    </TextBox>
  );
};

UserRegistration.defaultProps = {
  firstName: 'default',
  middleName: 'default',
  lastName: 'default',
  email: 'default',
  mobileNumber: 'default',
  id: 'default',
  type: ''
};

UserRegistration.propTypes = {
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['google', 'facebook', 'local', '']).isRequired
};

const mapStateToProps = (state, selectors) => ({
  currentUser: selectors.user.getCurrentUser(state)
});

export default withContext(UserRegistration, mapStateToProps);
