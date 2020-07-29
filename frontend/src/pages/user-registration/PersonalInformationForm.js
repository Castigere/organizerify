import React from 'react';
import PropTypes from 'prop-types';

import { user } from 'tasks';
import { useFormValidation } from 'utils';
import { personalInformationValidation } from './user-registration-validation';

import { Input, Form, Fieldset } from 'components/form';
import { Button } from 'components/buttons';

const PersonalInformationForm = ({
  firstName,
  middleName,
  lastName,
  mobileNumber,
  email,
  id,
  closed
}) => {
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
      <Fieldset closed={closed} legend="Personal information" collapsible>
        <Input
          label="First name"
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          label="Middle name"
          type="text"
          name="middleName"
          value={values.middleName}
          onChange={handleChange}
          error={errors.middleName}
        />
        <Input
          label="Last name"
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          label="Mobile number"
          type="text"
          name="mobileNumber"
          value={values.mobileNumber}
          onChange={handleChange}
          error={errors.mobileNumber}
        />
        <Input
          label="Email address"
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
          tooltip="Save updated profile"
          alt="Save updated profile"
        >
          Submit
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
