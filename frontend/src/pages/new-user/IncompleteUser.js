import React from 'react';
import PropTypes from 'prop-types';

import withContext from 'context';
import { user } from 'tasks';
import { useFormValidation } from './forms';
import validation from './validation-schema';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const IncompleteUser = ({
  currentUser: { firstName, middleName, lastName, email, mobileNumber, id }
}) => {
  const { values, errors, handleBlur, handleChange } = useFormValidation(
    { firstName, middleName, lastName, mobileNumber, email },
    validation
  );

  const handleSubmit = event => {
    event.preventDefault();
    user.updateCurrentUser({ ...values, id });
  };

  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <Form onSubmit={handleSubmit}>
        <Fieldset legend="Personal information">
          <Input
            label="First name"
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Input
            label="Middle name"
            type="text"
            name="middleName"
            value={values.middleName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.middleName}
          />
          <Input
            label="Last name"
            type="text"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.lastName}
          />
          <Input
            label="Mobile number"
            type="text"
            name="mobileNumber"
            value={values.mobileNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.mobileNumber}
          />
          <Input
            label="Email address"
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email}
          />
          <Button right type="submit">
            Submit
          </Button>
        </Fieldset>
      </Form>
    </TextBox>
  );
};

PropTypes.IncompleteUser = {
  userName: PropTypes.string.isRequied,
  middleName: PropTypes.string.isRequied,
  lastName: PropTypes.string.isRequied,
  email: PropTypes.string.isRequied,
  mobileNumber: PropTypes.string.isRequied,
  id: PropTypes.string.isRequied
};

const mapStateToProps = (state, selectors) => ({
  currentUser: selectors.user.getCurrentUser(state)
});

export default withContext(IncompleteUser, mapStateToProps);
