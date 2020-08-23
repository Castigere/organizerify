import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from '@castigere/components';

import { user } from 'tasks';
import { useFormValidation } from 'utils';
import { passwordValidation } from './user-registration-validation';

import { Input, Form, Fieldset } from 'components/form';

const PasswordChangeForm = ({ id, closed }) => {
  const { t } = useTranslation();
  const { isValid, values, errors, handleChange } = useFormValidation(
    { currentPassword: '', newPassword: '', confirmedPassword: '' },
    passwordValidation
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.setNewUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      id
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset closed={closed} legend={t('userregistration:changePasswordLegend')} collapsible>
        <Input
          label={t('userregistration:currentPasswordInput')}
          type="password"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />
        <Input
          label={t('userregistration:newPasswordInput')}
          type="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <Input
          label={t('userregistration:confirmedPasswordInput')}
          type="password"
          name="confirmedPassword"
          value={values.confirmedPassword}
          onChange={handleChange}
          error={errors.confirmedPassword}
        />
        <Button
          right
          type="submit"
          disabled={!isValid}
          tooltip={t('userregistration:changePasswordButtonAlt')}
          alt={t('userregistration:changePasswordButtonAlt')}
        >
          {t('userregistration:changePasswordButton')}
        </Button>
      </Fieldset>
    </Form>
  );
};

PasswordChangeForm.defaultProps = {
  closed: false
};

PasswordChangeForm.propTypes = {
  id: PropTypes.string.isRequired,
  closed: PropTypes.bool
};

export default PasswordChangeForm;
