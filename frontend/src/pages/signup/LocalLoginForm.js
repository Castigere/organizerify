import React from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { passwordValidation } from './signup-validation';

import { Input, Form, Fieldset } from 'components/form';
import { Button } from 'components/buttons';

const LocalLoginForm = ({ email }) => {
  const { values, errors, isValid, handleChange } = useFormValidation(
    { password: '' },
    passwordValidation,
    0
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.loginUser({ email, password: values.password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset legend="Enter password to log in">
        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button right disabled={!isValid}>
          Log in
        </Button>
      </Fieldset>
    </Form>
  );
};

LocalLoginForm.propTypes = {
  email: PropTypes.string.isRequired
};

export default LocalLoginForm;
