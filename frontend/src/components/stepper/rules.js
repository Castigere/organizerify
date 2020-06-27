import steps from './steps';

const {
  UNKNOWN_USER_ENTER_EMAIL,
  EXISTING_USER_ENTER_PASSWORD,
  NEW_USER_CREATE_ACCOUNT,
  EXISTING_USER_WITH_FACEBOOK_ACCOUNT,
  EXISTING_USER_WITH_GOOGLE_ACCOUNT,
  SUBMIT_CREATE_ACCOUNT,
  SUBMIT_LOG_IN
} = steps;

const evaluateNextStep = (step, facts) => {
  if (step === EXISTING_USER_ENTER_PASSWORD) {
    if (facts.enteredPassword) {
      return SUBMIT_LOG_IN;
    }
    return step;
  }
  if (step === NEW_USER_CREATE_ACCOUNT) {
    if (facts.confirmedPassword) {
      return SUBMIT_CREATE_ACCOUNT;
    }
    return step;
  }
  if (step === UNKNOWN_USER_ENTER_EMAIL) {
    if (!facts.account) {
      return UNKNOWN_USER_ENTER_EMAIL;
    }
    if (facts.account.exists && facts.account.type === 'local') {
      return EXISTING_USER_ENTER_PASSWORD;
    }
    if (!facts.account.exists) {
      return NEW_USER_CREATE_ACCOUNT;
    }
    if (facts.account.exists && facts.account.type === 'facebook') {
      return EXISTING_USER_WITH_FACEBOOK_ACCOUNT;
    }
    if (facts.account.exists && facts.account.type === 'google') {
      return EXISTING_USER_WITH_GOOGLE_ACCOUNT;
    }
    return step;
  }
  return step;
};

export default evaluateNextStep;
