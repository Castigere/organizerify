import React, { useState } from 'react';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewAccountForm';

const Login = () => {
  const [accountType, setAccountType] = useState();

  return (
    <>
      <TextBox>
        <H1> Login </H1>
        <EmailForm setAccountType={setAccountType} />
        {accountType && accountType.type === 'new' && <NewAccountForm email={accountType.email} />}
      </TextBox>
    </>
  );
};

export default Login;
