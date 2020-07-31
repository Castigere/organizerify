import React, { useState } from 'react';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewAccountForm';

const Login = () => {
  const [accountType, setAccountType] = useState({ type: '', email: '' });

  const { type, email } = accountType;

  return (
    <TextBox>
      <H1> Login </H1>
      <EmailForm setAccountType={setAccountType} />
      {type === 'new' && <NewAccountForm email={email} />}
    </TextBox>
  );
};

export default Login;
