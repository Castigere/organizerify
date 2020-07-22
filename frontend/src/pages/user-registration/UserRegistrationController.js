import React from 'react';
import PropTypes from 'prop-types';

import withContext from 'context';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import PersonalInformationForm from './PersonalInformationForm';
import PasswordChangeForm from './PasswordChangeForm';

const UserRegistration = ({
  currentUser: { id, firstName, middleName, lastName, email, mobileNumber }
}) => {
  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <PersonalInformationForm
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        email={email}
        mobileNumber={mobileNumber}
        id={id}
      />
      <PasswordChangeForm id={id} closed />
    </TextBox>
  );
};

PropTypes.UserRegistration = {
  firstName: PropTypes.string.isRequied,
  middleName: PropTypes.string.isRequied,
  lastName: PropTypes.string.isRequied,
  email: PropTypes.string.isRequied,
  mobileNumber: PropTypes.string.isRequied,
  id: PropTypes.string.isRequied
};

const mapStateToProps = (state, selectors) => ({
  currentUser: selectors.user.getCurrentUser(state)
});

export default withContext(UserRegistration, mapStateToProps);
