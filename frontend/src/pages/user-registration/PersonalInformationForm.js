import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from '@castigere/components';

import { user } from 'tasks';
import { useFormValidation } from 'utils';
import { personalInformationValidation } from './user-registration-validation';

import { Input, Form, Fieldset } from 'components/form';

const PersonalInformationForm = ({
  firstName,
  middleName,
  lastName,
  mobileNumber,
  email,
  id,
  closed
}) => {
  const { t } = useTranslation();
  const { isValid, values, errors, handleChange } = useFormValidation(
    { firstName, middleName, lastName, mobileNumber, email },
    personalInformationValidation
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.updateCurrentUser({ ...values, id });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset
        closed={closed}
        legend={t('userregistration:personalInformationLegend')}
        collapsible
      >
        <Input
          label={t('userregistration:firstNameInput')}
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          label={t('userregistration:middleNameInput')}
          type="text"
          name="middleName"
          value={values.middleName}
          onChange={handleChange}
          error={errors.middleName}
        />
        <Input
          label={t('userregistration:lastNameInput')}
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          label={t('userregistration:mobileNumberInput')}
          type="text"
          name="mobileNumber"
          value={values.mobileNumber}
          onChange={handleChange}
          error={errors.mobileNumber}
        />
        <Input
          label={t('userregistration:emailInput')}
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Button
          right
          type="submit"
          disabled={!isValid}
          tooltip={t('userregistration:updateButtonAlt')}
          alt={t('userregistration:updateButtonAlt')}
        >
          {t('userregistration:updateButton')}
        </Button>
      </Fieldset>
    </Form>
  );
};

PersonalInformationForm.defaultProps = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  id: '',
  closed: false
};

PersonalInformationForm.propTypes = {
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  mobileNumber: PropTypes.string,
  id: PropTypes.string,
  closed: PropTypes.bool
};

export default PersonalInformationForm;
