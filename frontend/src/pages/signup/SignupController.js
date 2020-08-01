import React, { useState } from 'react';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewAccountForm';

const Signup = () => {
  const [{ type, email }, setAccountType] = useState({ type: '', email: '' });

  return (
    <TextBox>
      <H1> Signup </H1>
      <EmailForm setAccountType={setAccountType} />
      {type === 'new' && <NewAccountForm email={email} />}
    </TextBox>
  );
};

export default Signup;
