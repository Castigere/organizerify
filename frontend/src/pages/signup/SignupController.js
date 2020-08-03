import React, { useState } from 'react';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewSignUpForm';
import LocalSignUpForm from './LocalLoginForm';

const Signup = () => {
  const [{ type, email }, setAccountType] = useState({ type: '', email: '' });

  return (
    <TextBox>
      <H1> Signup </H1>
      <EmailForm setAccountType={setAccountType} />
      {type === 'new' && <NewAccountForm email={email} />}
      {type === 'local' && <LocalSignUpForm email={email} />}
    </TextBox>
  );
};

export default Signup;
