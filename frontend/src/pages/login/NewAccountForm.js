import React from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { newAccountValidation } from './login-validation';
import { user } from 'tasks';

import { Input, Form, Fieldset } from 'components/form';
import { Button } from 'components/buttons';

const NewAccountForm = ({ email }) => {
  const { isValid, values, errors, handleChange } = useFormValidation(
    { newPassword: '', confirmedPassword: '' },
    newAccountValidation
  );

  const handleSubmit = () => {
    user.loginUser({
      email,
      password: values.newPassword
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset legend="Email address not registered, create new account?">
        <Input
          label="New passwordt"
          name="newPassword"
          type="password"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <Input
          label="Confirm new password"
          name="confirmedPassword"
          type="password"
          value={values.confirmedPassword}
          onChange={handleChange}
          error={errors.confirmedPassword}
        />
        <Button right disabled={!isValid}>
          Login
        </Button>
      </Fieldset>
    </Form>
  );
};

NewAccountForm.propTypes = {
  email: PropTypes.string.isRequired
};

export default NewAccountForm;
