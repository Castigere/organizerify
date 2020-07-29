import React, { useState } from 'react';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewAccountForm';

const Login = () => {
  const [accountType, setAccountType] = useState();

  // console.log('isValid', isValid);
  // console.log('ERRORS', errors);
  return (
    <>
      <TextBox>
        <H1> Login </H1>
        <EmailForm setAccountType={setAccountType} />
        {accountType === 'new' && <NewAccountForm />}
      </TextBox>
    </>
  );
};

export default Login;
