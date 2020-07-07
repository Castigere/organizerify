import * as yup from 'yup';

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
  email: yup.object().shape({
    email: yup.string().max(64, 'Middle name too long')
  })
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
