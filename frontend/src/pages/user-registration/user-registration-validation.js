import * as yup from 'yup';
import i18next from 'i18next'

import { user } from 'tasks';
import { REGEXP_EMAIL, forWhitespaces } from 'utils';

const personalInformationValidation = yup.object().shape({
  firstName: yup
    .string()
    .max(64, i18next.t('userregistration:validation.firstNameMaxLength'))
    .test(...forWhitespaces(i18next.t('userregistration:validation.firstNameNoWhitespaces')))
    .required(i18next.t('userregistration:validation.firstNameRequired')),
  middleName: yup
    .string()
    .max(64, i18next.t('userregistration:validation.middleNameMaxLength'))
    .test(...forWhitespaces(i18next.t('userregistration:validation.middleNameNoWhitespaces'))),
  lastName: yup
    .string()
    .max(64, i18next.t('userregistration:validation.lastNameMaxLength'))
    .test(...forWhitespaces(i18next.t('userregistration:validation.lastNameNoWhitespaces')))
    .required(i18next.t('userregistration:validation.lastNameRequired')),
  mobileNumber: yup.string().max(64, i18next.t('userregistration:validation.mobileNumberMaxLength')),
  email: yup
    .string()
    .max(64, i18next.t('userregistration:validation.emailMaxLength'))
    .test(...forWhitespaces(i18next.t('userregistration:validation.emailNoWhitespaces')))
    .email(i18next.t('userregistration:validation.emailNotValidFormat'))
    .test('', i18next.t('userregistration:validation.emailNotAvailable'), value => {
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
    .required(i18next.t('userregistration:validation.currentPasswordRequired')),
  newPassword: yup
    .string()
    .min(8, i18next.t('userregistration:validation.newPasswordMinLength'))
    .max(64, i18next.t('userregistration:validation.newPasswordMaxLength'))
    .test(...forWhitespaces(i18next.t('userregistration:validation.newPasswordNoWhitespaces')))
    .required(i18next.t('userregistration:validation.newPasswordRequired')),
  confirmedPassword: yup.string().when('newPassword', {
    is: val => val && val.length > 0,
    then: yup
      .string()
      .required(i18next.t('userregistration:validation.confirmedPasswordRequired'))
      .oneOf([yup.ref('newPassword')], i18next.t('userregistration:validation.confirmedPasswordNotMatching'))
  })
});

export { personalInformationValidation, passwordValidation };
