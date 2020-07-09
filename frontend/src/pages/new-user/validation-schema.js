import * as yup from 'yup';

import { user } from 'tasks';
import { REGEXP_EMAIL } from 'config';

const validation = {
  firstName: yup.object().shape({
    firstName: yup
      .string()
      .min(1, 'First name missing')
      .max(64, 'First name too long')
  }),
  middleName: yup.object().shape({
    middleName: yup.string().max(64, 'Middle name too long')
  }),
  lastName: yup.object().shape({
    lastName: yup.string().max(64, 'Last name too long')
  }),
  mobileNumber: yup.object().shape({
    mobileNumber: yup.string().max(64, 'Last name too long')
  }),
  email: yup.object().shape({
    email: yup
      .string()
      .email('Not an email address')
      .test('Valid email address', 'Not a valid email address', value =>
        REGEXP_EMAIL.test(value)
          ? user.getEmailAvailability({ email: value }).then(email => email.available)
          : value
          ? false
          : false
      )
  })

  // .test('Valid email address', 'Not a valid email address', async value => {
  //   if (REGEXP_EMAIL.test(value)) {
  //     const result = await user.getEmailAvailability({ email: value });
  //     if (!result.available) return false;
  //   } else {
  //     return false;
  //   }
  //   return true;
  // })
  // password: yup.object().shape({
  //   password: yup
  //     .string()
  //     .min(8)
  //     .max(32)
  // }),
  // confirmedPassword: yup.object().shape({
  //   password: yup
  //     .string()
  //     .min(8)
  //     .max(32),
  //   confirmedPassword: yup
  //     .string()
  //     .oneOf([yup.ref('password'), null], 'Passwords do not match')
  //     .required('Password confirmation is required')
  // }),
  // enteredPassword: yup.object().shape({
  //   password: yup.string()
  // })
};

export default validation;
