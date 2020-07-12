import React from 'react';
import PropTypes from 'prop-types';

import withContext from 'context';
import { user } from 'tasks';
import { useFormValidation } from './forms';
import { personalInformationValidation, passwordValidation } from './validation-schema';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const IncompleteUser = ({
  currentUser: { firstName, middleName, lastName, email, mobileNumber, id }
}) => {
  const PersonalInformationForm = () => {
    const { isValid, values, errors, handleBlur, handleChange } = useFormValidation(
      { firstName, middleName, lastName, mobileNumber, email },
      personalInformationValidation
    );

    const handleSubmit = event => {
      event.preventDefault();
      user.updateCurrentUser({ ...values, id });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Fieldset legend="Personal information">
          <Input
            label="First name"
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Input
            label="Middle name"
            type="text"
            name="middleName"
            value={values.middleName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.middleName}
          />
          <Input
            label="Last name"
            type="text"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.lastName}
          />
          <Input
            label="Mobile number"
            type="text"
            name="mobileNumber"
            value={values.mobileNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.mobileNumber}
          />
          <Input
            label="Email address"
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email}
          />
          <Button right type="submit" disabled={!isValid}>
            Submit
          </Button>
        </Fieldset>
      </Form>
    );
  };

  const PasswordForm = () => {
    const { isValid, values, errors, handleBlur, handleChange } = useFormValidation(
      { currentPassword: '', newPassword: '', confirmedPassword: '' },
      passwordValidation
    );

    return (
      <Form>
        <Fieldset legend="Change password">
          <Input
            label="Current password"
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.currentPassword}
          />
          <Input
            label="New password"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.newPassword}
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirmedPassword"
            value={values.confirmedPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.confirmedPassword}
          />
          <Button right type="submit" disabled={!isValid}>
            Submit
          </Button>
        </Fieldset>
      </Form>
    );
  };

  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <PersonalInformationForm />
      <PasswordForm />
    </TextBox>
  );
};

PropTypes.IncompleteUser = {
  userName: PropTypes.string.isRequied,
  middleName: PropTypes.string.isRequied,
  lastName: PropTypes.string.isRequied,
  email: PropTypes.string.isRequied,
  mobileNumber: PropTypes.string.isRequied,
  id: PropTypes.string.isRequied
};

const mapStateToProps = (state, selectors) => ({
  currentUser: selectors.user.getCurrentUser(state)
});

export default withContext(IncompleteUser, mapStateToProps);
