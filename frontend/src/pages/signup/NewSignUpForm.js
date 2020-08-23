import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/buttons';

import { useFormValidation, getURLSearchParam } from 'utils';
import { newPasswordValidtaion } from './signup-validation';
import { user } from 'tasks';
import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from 'config';

import { Input, Form, Fieldset, Panel } from 'components/form';
import { SignUpWithFacebookButton, SignUpWithGoogleButton } from 'components/buttons';
import { HorizontallyAlign } from 'components/containers';

const NewSignUpForm = ({ email }) => {
  const { t } = useTranslation();
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

  const url = getURLSearchParam('url');

  const signUpWithGoogle = event => {
    event.preventDefault();
    window.location.href = `${GOOGLE_AUTH_ENDPOINT}?url=${url}&email=${email}`;
  };

  const signUpWithFacebook = event => {
    event.preventDefault();
    window.location.href = `${FACEBOOK_AUTH_ENDPOINT}?url=${url}&email=${email}`;
  };

  return (
    <>
      <Panel>{t('signup:emailNotInUseInfo')}</Panel>
      <HorizontallyAlign>
        <SignUpWithGoogleButton onClick={signUpWithGoogle} />
        <SignUpWithFacebookButton onClick={signUpWithFacebook} />
      </HorizontallyAlign>
      <Form onSubmit={handleSubmit}>
        <Fieldset legend={t('signup:newUserLegend')}>
          <Input
            label={t('signup:passwordInput')}
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
          <Input
            label={t('signup:confirmedPasswordInput')}
            name="confirmedPassword"
            type="password"
            value={values.confirmedPassword}
            onChange={handleChange}
            error={errors.confirmedPassword}
          />
          <Button right disabled={!isValid}>
            {t('signup:signUpButton')}
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
