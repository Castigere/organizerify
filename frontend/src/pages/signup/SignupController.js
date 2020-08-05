import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextBox } from 'components/form';
import { H1 } from 'components/typography';

import EmailForm from './EmailForm';
import NewAccountForm from './NewSignUpForm';
import LocalSignUpForm from './LocalLoginForm';

const Signup = () => {
  const [{ type, email }, setAccountType] = useState({ type: '', email: '' });
  const { t } = useTranslation();

  return (
    <TextBox>
      <H1> {t('signup:title')} </H1>
      <EmailForm setAccountType={setAccountType} />
      {type === 'new' && <NewAccountForm email={email} />}
      {type === 'local' && <LocalSignUpForm email={email} />}
    </TextBox>
  );
};

export default Signup;
