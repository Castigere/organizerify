import * as yup from 'yup';

import { user } from 'tasks';
import { REGEXP_EMAIL, REGEXP_WHITESPACES } from 'utils';

const forWhitespaces = [
  'Field has no whitespaces',
  'Field cannot contain any whitespaces',
  value => (REGEXP_WHITESPACES.test(value) ? true : false)
];

const personalInformationValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(1, 'First name missing')
    .max(64, 'First name too long')
    .test(...forWhitespaces),
  middleName: yup
    .string()
    .max(64, 'Middle name too long')
    .test(...forWhitespaces),
  lastName: yup
    .string()
    .max(64, 'Last name too long')
    .test(...forWhitespaces)
    .required('This field is reqruired'),
  mobileNumber: yup.string().max(64, 'Last name too long'),
  email: yup
    .string()
    .test(...forWhitespaces)
    .email('Not an email address')
    .test('Email address available', 'Email address not available', value => {
      return REGEXP_EMAIL.test(value)
        ? user.getEmailAvailability({ email: value }).then(email => email.available)
        : value
        ? false
        : false;
    })
});

const passwordValidation = yup.object().shape({
  currentPassword: yup
    .string()
    .required('This field is required')
    .test(...forWhitespaces),
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

export { personalInformationValidation, passwordValidation };
