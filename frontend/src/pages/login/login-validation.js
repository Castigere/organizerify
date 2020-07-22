import * as yup from 'yup';

import { user } from 'tasks';

import { REGEXP_EMAIL } from 'utils';

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email('Not an email address')
    .test('Valid email address', 'Not a valid email address', value => {
      console.log('ERROR CHECK');
      return REGEXP_EMAIL.test(value)
        ? user.getUserAccountType({ email: value }).then(email => email.available)
        : value
        ? false
        : false;
    }),
  password: yup
    .string()
    .max(64, 'Password is too long')
    .required('This field is required')
});

export { loginValidation };
