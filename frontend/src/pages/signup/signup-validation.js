import * as yup from 'yup';
import i18next from 'i18next';

import { forWhitespaces } from 'utils';

const emailValidation = yup.object().shape({
  email: yup
    .string()
    .max(64, i18next.t('signup:validation.emailMaxLength'))
    .test(...forWhitespaces(i18next.t('signup:validation.emailNoWhitespaces')))
    .email(i18next.t('signup:validation.emailNotValidFormat'))
});

const newPasswordValidtaion = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, i18next.t('signup:validation.passwordMinLength'))
    .max(64, i18next.t('signup:validation.passwordMaxLength'))
    .test(...forWhitespaces(i18next.t('signup:validation.passwordNoWhitespaces')))
    .required(i18next.t('signup:validation.passwordRequired')),
  confirmedPassword: yup.string().when('newPassword', {
    is: val => val && val.length > 0,
    then: yup
      .string()
      .oneOf([yup.ref('newPassword')], i18next.t('signup:validation.passwordNotMaching'))
      .required(('signup:validation.passwordRequired'))
  })
});

const passwordValidation = yup.object().shape({
  password: yup
    .string()
    .test(...forWhitespaces('signup:validation.emailNoWhitespaces'))
    .min(1, i18next.t('signup:validation.passwordRequired'))
    .required(i18next.t('signup:validation.passwordRequired'))
});

export { emailValidation, passwordValidation, newPasswordValidtaion };
