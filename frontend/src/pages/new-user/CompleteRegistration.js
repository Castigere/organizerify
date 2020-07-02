import React from 'react';
import { Formik } from 'formik';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const CompleteRegistration = () => {
  return (
    <TextBox>
      <H1>Complete registration</H1>
      <Formik
        initialValues={{ name: 'jared' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => {
          console.log('formik', props);
          return (
            <Form onSubmit={props.handleSubmit}>
              <Fieldset legend="Personal information">
                <Input
                  label="First name"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  name="name"
                />
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                <Input label="Last name" />
                <Input label="Email address" />
                <Button right type="submit">
                  Submit
                </Button>
              </Fieldset>
              <Fieldset legend="Preferences">
                <Input label="First name" />
                <Input label="First name" />
                <Input label="First name" />
                <Button right>Save</Button>
              </Fieldset>
            </Form>
          );
        }}
      </Formik>
    </TextBox>
  );
};

export default CompleteRegistration;
