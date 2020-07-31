import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { emailValidation } from './login-validation';
import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from 'config';

import { SubmitInput, Form, Fieldset } from 'components/form';

const EmailForm = ({ setAccountType }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const { isValid, values, errors, handleChange } = useFormValidation(
    { email: '' },
    emailValidation
  );

  const [handleSubmit, setHandleSubmit] = useState(() => {});

  useEffect(() => {
    const redirectToGoogle = event => {
      event.preventDefault();
      window.location.href = GOOGLE_AUTH_ENDPOINT;
    };

    const redirectToFacebook = event => {
      event.preventDefault();
      window.location.href = FACEBOOK_AUTH_ENDPOINT;
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
  }, [values.email, isValid, setAccountType]);

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset legend="Enter e-mail address to login">
        <SubmitInput
          label="E-mail"
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
