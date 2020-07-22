import React from 'react';
import PropTypes from 'prop-types';

import { user } from 'tasks';
import { useFormValidation } from 'utils';
import { passwordValidation } from './user-registration-validation';

import { Input, Form, Fieldset } from 'components/form';
import { Button } from 'components/buttons';

const PasswordChangeForm = ({ id, closed }) => {
  const { isValid, values, errors, handleChange } = useFormValidation(
    { currentPassword: '', newPassword: '', confirmedPassword: '' },
    passwordValidation
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.setNewUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      id
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset closed={closed} legend="Change password">
        <Input
          label="Current password"
          type="password"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          required
        />
        <Input
          label="New password"
          type="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirmedPassword"
          value={values.confirmedPassword}
          onChange={handleChange}
          error={errors.confirmedPassword}
          required
        />
        <Button right type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Fieldset>
    </Form>
  );
};

PasswordChangeForm.defaultProps = {
  closed: false
};

PasswordChangeForm.propTypes = {
  id: PropTypes.string.isRequired,
  closed: PropTypes.bool
};

export default PasswordChangeForm;
