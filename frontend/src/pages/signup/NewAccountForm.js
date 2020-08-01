import React from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { newAccountValidation } from './signup-validation';
import { user } from 'tasks';

import { Input, Form, Fieldset, Panel } from 'components/form';
import { Button, SignupWithGoogle, SignupWithFacebook } from 'components/buttons';
import { HorizontallyAlign } from 'components/containers';

const NewAccountForm = ({ email }) => {
  const { isValid, values, errors, handleChange } = useFormValidation(
    { newPassword: '', confirmedPassword: '' },
    newAccountValidation
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.signUpUser({
      email,
      password: values.newPassword
    });
  };

  return (
    <>
      <Panel>
        The entered e-mail address is not in use. Enter a password to create a local user or use one
        of the following identity providers to register.
      </Panel>
      <HorizontallyAlign>
        <SignupWithGoogle />
        <SignupWithFacebook />
      </HorizontallyAlign>
      <Form onSubmit={handleSubmit}>
        <Fieldset legend="Create new local user?">
          <Input
            label="Password"
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
          <Input
            label="Confirm password"
            name="confirmedPassword"
            type="password"
            value={values.confirmedPassword}
            onChange={handleChange}
            error={errors.confirmedPassword}
          />
          <Button right disabled={!isValid}>
            Register
          </Button>
        </Fieldset>
      </Form>
    </>
  );
};

NewAccountForm.propTypes = {
  email: PropTypes.string.isRequired
};

export default NewAccountForm;
