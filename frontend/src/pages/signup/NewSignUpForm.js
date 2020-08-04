import React from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { newPasswordValidtaion } from './signup-validation';
import { user } from 'tasks';
// import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from 'config';

import { Input, Form, Fieldset, Panel } from 'components/form';
import { Button } from 'components/buttons';
import { HorizontallyAlign } from 'components/containers';

const NewSignUpForm = ({ email }) => {
  const { isValid, values, errors, handleChange } = useFormValidation(
    { newPassword: '', confirmedPassword: '' },
    newPasswordValidtaion
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.signUpUser({
      email,
      password: values.newPassword
    });
  };

  // const url = getURLSearchParam('url');

  // const signUpWithGoogle = event => {
  //   event.preventDefault();
  //   window.location.href = `${GOOGLE_AUTH_ENDPOINT}?url=${url}&email=${email}`;
  // };

  // const signUpWithFacebook = event => {
  //   event.preventDefault();
  //   window.location.href = `${FACEBOOK_AUTH_ENDPOINT}?url=${url}&email=${email}`;
  // };

  return (
    <>
      <Panel>
        The entered e-mail address is not in use. Enter a password to create a local user or sign up
        with one of the following identity providers.
      </Panel>
      <HorizontallyAlign>
        {/* <SignUpWithGoogle onClick={signUpWithGoogle} />
        <SignUpWithFacebookButton onClick={signUpWithFacebook} /> */}
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

NewSignUpForm.propTypes = {
  email: PropTypes.string.isRequired
};

export default NewSignUpForm;
