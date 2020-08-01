import * as yup from 'yup';

import { REGEXP_EMAIL, REGEXP_WHITESPACES } from 'utils';

const forWhitespaces = [
  'Field has no whitespaces',
  'Field cannot contain any whitespaces',
  value => (REGEXP_WHITESPACES.test(value) ? true : false)
];

const emailValidation = yup.object().shape({
  email: yup
    .string()
    .max(64, 'Email not too long', 'Email address had too many characters')
    .test(...forWhitespaces)
    .email('Not an email address')
    .test('Valid email address', 'Not a valid email address', value => REGEXP_EMAIL.test(value))
});

const newAccountValidation = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password needs to be at least eight characters long')
    .max(64, 'Password is too long')
    .test(...forWhitespaces)
    .required('This field is required'),
  confirmedPassword: yup.string().when('newPassword', {
    is: val => val && val.length > 0,
    then: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords not matching')
      .required('This field is required')
  })
});

const localAccountValidation = yup.object().shape({
  password: yup
    .string()
    .test(...forWhitespaces)
    .min(1, 'Enter password')
    .required('Enter password')
});

export { emailValidation, newAccountValidation, localAccountValidation };
