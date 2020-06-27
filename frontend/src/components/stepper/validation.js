import * as yup from 'yup';

const validation = {
  email: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required')
  }),
  password: yup.object().shape({
    password: yup
      .string()
      .min(8)
      .max(32)
  }),
  confirmedPassword: yup.object().shape({
    password: yup
      .string()
      .min(8)
      .max(32),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Password confirmation is required')
  }),
  enteredPassword: yup.object().shape({
    password: yup.string()
  })
};

export default validation;
