import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import signup from 'translations/signup';
import userregistration from 'translations/userregistration';

const resources = {
  en: {
    signup: signup.en,
    userregistration: userregistration.en,
    morradi: {
      pageHeader: 'Ikke sign up'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
