import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { emailValidation } from './login-validation';

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

  const handleSubmit = event => {
    event.preventDefault();
    user.getUserAccountType({ email: values.email }).then(result => setAccountType(result));
  };

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
