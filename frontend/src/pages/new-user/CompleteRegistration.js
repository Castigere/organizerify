import React from 'react';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const CompleteRegistration = () => {
  return (
    <TextBox>
      <H1>Complete registration</H1>
      <Form>
        <Fieldset legend="Personal information">
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email address" />
          <Button right>UPDATE</Button>
        </Fieldset>
        <Fieldset legend="Preferences">
          <Input label="First name" />
          <Input label="First name" />
          <Input label="First name" />
          <Button right>Save</Button>
        </Fieldset>
      </Form>
    </TextBox>
  );
};

export default CompleteRegistration;
