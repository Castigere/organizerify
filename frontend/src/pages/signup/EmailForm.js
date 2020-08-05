import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { emailValidation } from './signup-validation';
import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from 'config';

import { SubmitInput, Form, Fieldset } from 'components/form';

const EmailForm = ({ setAccountType }) => {
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const { isValid, values, errors, handleChange } = useFormValidation(
    { email: '' },
    emailValidation
  );

  const [handleSubmit, setHandleSubmit] = useState(() => event => event.preventDefault());

  const { search } = new URL(window.location.href);

  useEffect(() => {
    const redirectToGoogle = event => {
      event.preventDefault();
      window.location.href = `${GOOGLE_AUTH_ENDPOINT}${search}`;
    };

    const redirectToFacebook = event => {
      event.preventDefault();
      window.location.href = `${FACEBOOK_AUTH_ENDPOINT}${search}`;
    };

    isValid &&
      user.getUserAccountType({ email: values.email }).then(result => {
        switch (result.type) {
          case 'google':
            setHandleSubmit(() => redirectToGoogle);
            break;
          case 'facebook':
            setHandleSubmit(() => redirectToFacebook);
            break;
          default:
            setHandleSubmit(() => event => {
              event.preventDefault();
              setAccountType(result);
            });
            break;
        }
      });

    !isValid && setAccountType({ type: '', email: '' });
  }, [values.email, isValid, setAccountType, search]);

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset legend={t('signup:emailLegend')}>
        <SubmitInput
          label={t('signup:emailInput')}
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          focus={inputRef}
          isValid={isValid}
          onSubmit={handleSubmit}
        />
      </Fieldset>
    </Form>
  );
};

EmailForm.propTypes = {
  setAccountType: PropTypes.func.isRequired
};

export default EmailForm;
