import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import withContext from 'context';
import { user } from 'tasks';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const IncompleteUser = ({
  currentUser: { firstName, middleName, lastName, email, mobileNumber, id }
}) => {
  console.log('ID', firstName, middleName, lastName, email, mobileNumber);
  return (
    <TextBox>
      <H1>Incomplete registration</H1>
      <Formik
        initialValues={{ firstName, middleName, lastName, email, mobileNumber }}
        onSubmit={(values, _actions) => user.updateCurrentUser({ ...values, id })}
      >
        {props => {
          // console.log('formik', props);
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
