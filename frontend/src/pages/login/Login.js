import React, { useRef, useEffect } from 'react';

import { useFormValidation } from 'utils';
import { loginValidation } from './login-validation';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const Login = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const { isValid, values, errors, handleBlur, handleChange } = useFormValidation(
    { email: '', password: '' },
    loginValidation
  );

  console.log('ERRORS', errors);
  console.log('VALUES', values);

  return (
    <>
      <TextBox>
        <H1> Login </H1>
        <Form>
          <Fieldset>
            <Input
              label="e-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              focus={inputRef}
            />
            <Button right disabled={!isValid}>
              Login
            </Button>
          </Fieldset>
        </Form>
      </TextBox>
    </>
  );
};

export default Login;
