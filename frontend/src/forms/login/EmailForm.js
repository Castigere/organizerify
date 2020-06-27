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

const EmailForm = ({ isSubmitting, accountLookup }) => {
  return (
    <div className="center">
      <h3>ENTER EMAIL</h3>
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
                NEXT
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

EmailForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  accountLookup: PropTypes.func.isRequired
};

export default EmailForm;
