import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import './loginForm.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
});

const NewAccountForm = ({ isSubmitting, accountLookup }) => {
  return (
    <div className="login-frontpage center">
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={LoginSchema}
        validateOnChange
        onSubmit={values => accountLookup(values)}
      >
        {({ errors, values }) => (
          <Form>
            <div className="login-frontpage-login-field">
              <Field
                className="login-frontpage-email"
                type="email"
                name="email"
                autoComplete="email"
                spellCheck={false}
              />
              <button
                className="login-frontpage-btn"
                type="submit"
                disabled={!values.email || errors.email || isSubmitting}
              >
                CREATE
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

NewAccountForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  accountLookup: PropTypes.func.isRequired
};

export default NewAccountForm;
