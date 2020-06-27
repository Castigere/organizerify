import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import withContext from '../../context';
import { user } from '../../tasks';
import evaluateNextStep from './rules';
import validation from './validation';
import steps from './steps';
import { GOOGLE_AUTH_ENDPOINT, FACEBOOK_AUTH_ENDPOINT } from '../../config';

import Email from './steps/Email';
import Password from './steps/Password';
import CreateAccount from './steps/CreateAccount';
import GoogleIdentityProvider from './steps/GoogleIdentityProvider';
import FacebookIdentityProvider from './steps/FacebookIdentityProvider';

import './stepper.css';

const {
  UNKNOWN_USER_ENTER_EMAIL,
  SUBMIT_CREATE_ACCOUNT,
  SUBMIT_LOG_IN,
  EXISTING_USER_ENTER_PASSWORD,
  NEW_USER_CREATE_ACCOUNT,
  EXISTING_USER_WITH_FACEBOOK_ACCOUNT,
  EXISTING_USER_WITH_GOOGLE_ACCOUNT
} = steps;

const componentUrlMap = {
  UNKNOWN_USER_ENTER_EMAIL: { url: '/', component: Email },
  EXISTING_USER_ENTER_PASSWORD: { url: '/1', component: Password },
  NEW_USER_CREATE_ACCOUNT: { url: '/2', component: CreateAccount },
  EXISTING_USER_WITH_FACEBOOK_ACCOUNT: {
    url: '/4',
    component: FacebookIdentityProvider
  },
  EXISTING_USER_WITH_GOOGLE_ACCOUNT: {
    url: '/3',
    component: GoogleIdentityProvider
  }
};

const StepperController = ({ basePath, history, isSubmitting }) => {
  const idProviderBtnRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(UNKNOWN_USER_ENTER_EMAIL);
  const [nextStep, setNextStep] = useState(UNKNOWN_USER_ENTER_EMAIL);
  const [facts, setFact] = useState({
    account: false,
    confirmedPassword: false,
    checksDone: true
  });
  const [schema, setSchemaValue] = useState({
    email: '',
    password: '',
    enteredPassword: '',
    confirmedPassword: ''
  });
  const [errors, setErrors] = useState({});
  const hasErrors =
    errors.email || errors.password || errors.confirmedPassword || errors.enteredPassword;
  const isNextBtnDisabled = currentStep === nextStep || hasErrors || !facts.checksDone;
  const isBackBtnDisabled = currentStep === UNKNOWN_USER_ENTER_EMAIL;
  const isNextStepLinkToIdProvider =
    currentStep === EXISTING_USER_WITH_GOOGLE_ACCOUNT ||
    currentStep === EXISTING_USER_WITH_FACEBOOK_ACCOUNT;

  const onChange = async (value, name) => {
    setSchemaValue({ ...schema, ...value });
    setFact({ ...facts, checksDone: false });
    try {
      if (await validation[name].validate(value)) {
        setErrors({ ...errors, [name]: false });
        switch (name) {
          case 'email':
            setFact({
              ...facts,
              account: await user.getUserAccountType(value), // Flytt denne fra onChange til onSubmit, trenger kun validering her.
              checksDone: true
            });
            break;
          case 'confirmedPassword':
            setFact({
              ...facts,
              confirmedPassword: true,
              checksDone: true
            });
            break;
          case 'enteredPassword':
            setFact({
              ...facts,
              enteredPassword: true,
              checksDone: true
            });
            break;
          default:
            break;
        }
      }
    } catch (err) {
      setErrors({ ...errors, [name]: err.errors });
      setFact({
        ...facts,
        checksDone: true
      });
    }
  };

  const onNextClick = () => {
    switch (nextStep) {
      case SUBMIT_CREATE_ACCOUNT:
        user.signUpUser({
          email: schema.email,
          password: schema.password
        });
        return;
      case SUBMIT_LOG_IN:
        user
          .loginUser({
            email: schema.email,
            password: schema.enteredPassword
          })
          .catch(err => {
            setErrors({
              ...errors,
              enteredPassword: err.replace('GraphQL error: ', '')
            });
          });
        return;
      default:
        history.push(`${basePath}${componentUrlMap[nextStep].url}`);
        setCurrentStep(nextStep);
    }
  };

  const onBackClick = () => {
    history.goBack();
  };

  const onEnter = event => {
    if (event.key === 'Enter') {
      onNextClick();
    }
  };

  const submitBtn = () => {
    if (currentStep === NEW_USER_CREATE_ACCOUNT || currentStep === EXISTING_USER_ENTER_PASSWORD)
      return (
        <button
          className="login-frontpage-btn"
          type="button"
          disabled={isNextBtnDisabled}
          onClick={onNextClick}
        >
          SUBMIT
        </button>
      );
    if (currentStep === EXISTING_USER_WITH_FACEBOOK_ACCOUNT)
      return (
        <a href={FACEBOOK_AUTH_ENDPOINT} tabIndex="-1">
          <button className="login-frontpage-btn" type="button" ref={idProviderBtnRef}>
            FACEBOOK
          </button>
        </a>
      );
    if (currentStep === EXISTING_USER_WITH_GOOGLE_ACCOUNT)
      return (
        <a href={GOOGLE_AUTH_ENDPOINT} tabIndex="-1">
          <button className="login-frontpage-btn" type="button" ref={idProviderBtnRef}>
            GOOGLE
          </button>
        </a>
      );
    return (
      <button
        className="login-frontpage-btn"
        type="button"
        disabled={isNextBtnDisabled}
        onClick={onNextClick}
      >
        NEXT
      </button>
    );
  };

  // Check if current step / URL is synced with state and navigate to start if not
  useEffect(() => {
    if (
      history.location.pathname !== `${basePath}${componentUrlMap.UNKNOWN_USER_ENTER_EMAIL.url}` &&
      schema.email === ''
    ) {
      history.push(`${basePath}${componentUrlMap.UNKNOWN_USER_ENTER_EMAIL.url}`);
    }
  }, [basePath, schema.email, history]);

  // Whenever facts are updated, evaluate next step
  useEffect(() => {
    setNextStep(evaluateNextStep(currentStep, facts));
  }, [currentStep, facts]);

  // Always make sure that URL matches current step, if not, update current step to match
  useEffect(() => {
    Object.keys(componentUrlMap).forEach(step => {
      if (`${basePath}${componentUrlMap[step].url}` === history.location.pathname) {
        setCurrentStep(step);
      }
    });
  }, [history.location.pathname, basePath]);

  // Set focus on link to google/facebook auth for easier keyboard navigation
  useEffect(() => {
    if (isNextStepLinkToIdProvider) idProviderBtnRef.current.focus();
  }, [idProviderBtnRef, isNextStepLinkToIdProvider]);

  // console.log('STATE', schema);
  // console.log('FACTS', facts);
  // console.log('CURRENT STEP', currentStep);
  // console.log('NEXT STEP', nextStep);
  // console.log('ERRORS', errors);
  // console.log('HISTORY', history.location.pathname);
  // console.log('SCHEMA', schema);

  return (
    <div className="stepper-container">
      <div className={isSubmitting ? 'loader' : ''} />
      <Route
        exact
        path={`${basePath}`}
        render={() => (
          <Email onEnter={onEnter} onChange={onChange} email={schema.email} errors={errors.email} />
        )}
      />
      <Route
        exact
        path={`${basePath}/1`}
        render={() => (
          <Password
            onEnter={onEnter}
            onChange={onChange}
            email={schema.email}
            enteredPassword={schema.enteredPassword}
            errors={errors.enteredPassword}
          />
        )}
      />
      <Route
        exact
        path={`${basePath}/2`}
        render={() => (
          <CreateAccount
            onEnter={onEnter}
            onChange={onChange}
            email={schema.email}
            password={schema.password}
            confirmedPassword={schema.confirmedPassword}
            passwordError={errors.password}
            confirmedPasswordError={errors.confirmedPassword}
          />
        )}
      />
      <Route exact path={`${basePath}/3`} render={() => <GoogleIdentityProvider />} />
      <Route exact path={`${basePath}/4`} render={() => <FacebookIdentityProvider />} />
      <div className="login-frontpage-login-field center">
        <button
          className="login-frontpage-btn"
          type="button"
          disabled={isBackBtnDisabled}
          onClick={onBackClick}
        >
          BACK
        </button>
        {submitBtn()}
      </div>
    </div>
  );
};

StepperController.defaultProps = {};

StepperController.propTypes = {
  basePath: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, selectors) => ({
  isSubmitting: selectors.submit.getSubmitStatus(state)
});

export default withContext(StepperController, mapStateToProps, {
  history: true
});
