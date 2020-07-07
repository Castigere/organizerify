import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

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
    { firstName: '', middleName: '', email: '' },
    validation
  );
  console.log('Trigger setError?', errors);
  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <Form>
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
            label="Middle Name"
            type="text"
            name="middleName"
            value={values.middleName}
            onBlur={handleBlur}
            onChange={handleChange}
            errors={errors.middleName}
          />
          <Input
            label="Email address"
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            errors={errors.email}
          />
        </Fieldset>
      </Form>
      <Formik
        initialValues={{ firstName, middleName, lastName, email, mobileNumber }}
        onSubmit={(values, _actions) => user.updateCurrentUser({ ...values, id })}
      >
        {props => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <Fieldset legend="Personal information">
                <Input
                  label="First name"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstName}
                  name="firstName"
                />
                <Input
                  label="Middle Name"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.middleName}
                  name="middleName"
                />
                <Input
                  label="Last name"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastName}
                  name="lastName"
                />
                <Input
                  label="Email address"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  name="email"
                />
                <Input
                  label="Mobile number"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.mobileNumber}
                  name="mobileNumber"
                />
                <Button right type="submit">
                  Submit
                </Button>
              </Fieldset>
            </Form>
          );
        }}
      </Formik>
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
