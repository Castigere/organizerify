import * as yup from 'yup';

import { user } from 'tasks';
import { REGEXP_EMAIL } from 'config';

const personalInformationValidation = yup.object().shape({
  firstName: yup
    .string()
    .min(1, 'First name missing')
    .max(64, 'First name too long'),
  middleName: yup.string().max(64, 'Middle name too long'),
  lastName: yup
    .string()
    .max(64, 'Last name too long')
    .required('This field is reqruired'),
  mobileNumber: yup.string().max(64, 'Last name too long'),
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
});

const passwordValidation = yup.object().shape({
  currentPassword: yup.string().required('This field is required'),
  newPassword: yup
    .string()
    // .min(8, 'Password needs to be at least eight characters long')
    .max(64, 'Password is too long')
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
