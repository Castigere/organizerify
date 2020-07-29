import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { emailValidation } from './login-validation';

import { Input, Form, Fieldset } from 'components/form';
import { REGEXP_EMAIL } from 'utils';

const EmailForm = ({ setAccountType }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { values, errors, handleChange } = useFormValidation(
    { email: '', password: '', newPassword: '', confirmedPassword: '' },
    emailValidation
  );

  useEffect(() => {
    REGEXP_EMAIL.test(values.email) &&
      user.getUserAccountType({ email: values.email }).then(result => setAccountType(result.type));
  }, [values.email, errors.email, setAccountType]);

  // console.log('isValid', isValid);
  // console.log('ERRORS', errors);
  return (
    <Form>
      <Fieldset legend="Enter e-mail address to login">
        <Input
          label="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          focus={inputRef}
        />
      </Fieldset>
    </Form>
  );
};

EmailForm.propTypes = {
  setAccountType: PropTypes.func.isRequired
};

export default EmailForm;
