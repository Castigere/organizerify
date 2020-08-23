import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useFormValidation } from 'utils';
import { user } from 'tasks';
import { passwordValidation } from './signup-validation';
import { Button } from 'components/buttons';

import { Input, Form, Fieldset } from 'components/form';

const LocalLoginForm = ({ email }) => {
  const { t } = useTranslation();
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
      <Fieldset legend={t('signup:logInLegend')}>
        <Input
          label={t('signup:passwordInput')}
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button right disabled={!isValid}>
          {t('signup:logInButton')}
        </Button>
      </Fieldset>
    </Form>
  );
};

LocalLoginForm.propTypes = {
  email: PropTypes.string.isRequired
};

export default LocalLoginForm;
