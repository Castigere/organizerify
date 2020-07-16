import React, { useRef, useEffect } from 'react';

import { TextBox, Input, Form, Fieldset } from 'components/form';
import { H1 } from 'components/typography';
import { Button } from 'components/buttons';

const Frontpage = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <TextBox>
        <H1> Login </H1>
        <Form>
          <Fieldset>
            <Input label="e-mail" focus={inputRef} />
            <Button right>Login</Button>
          </Fieldset>
        </Form>
      </TextBox>
    </>
  );
};

export default Frontpage;
