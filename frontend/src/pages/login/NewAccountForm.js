import React from 'react';

import { useFormValidation } from 'utils';
import { newAccountValidation } from './login-validation';

import { Input, Form, Fieldset } from 'components/form';
import { Button } from 'components/buttons';

const Login = () => {
  const { isValid, values, errors, handleChange } = useFormValidation(
    { newPassword: '', confirmedPassword: '' },
    newAccountValidation
  );

  return (
    <Form>
      <Fieldset legend="E-mail not registererd, register new account">
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

export default Login;
