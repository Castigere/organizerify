import { useState, useEffect, useReducer, useRef, useCallback } from 'react';

import { objectIncludes } from 'utils';

const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';
const SET_VALUE = 'SET_VALUE';
const SET_VALID = 'SET_VALID';
const SET_NOT_VALID = 'SET_NOT_VALID';

const useFormValidation = (initialValues, validationSchema = {}, delay = 300) => {
  const [isInitialValidationDone, setInitialValidationDone] = useState(false);
  const [currentField, setCurrentField] = useState();
  const timeoutId = useRef();

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case ADD_ERROR: {
          return {
            ...state,
            errors: { ...state.errors, [action.currentField]: action.error.errors[0] }
          };
        }
        case REMOVE_ERROR: {
          delete state.errors[currentField];
          return { ...state };
        }
        case SET_VALUE: {
          return { ...state, values: { ...state.values, [action.name]: action.value } };
        }
        // Trigger no re-render if flag already is in desired state
        case SET_VALID: {
          return state.isValid ? state : { ...state, isValid: true };
        }
        case SET_NOT_VALID: {
          return state.isValid ? { ...state, isValid: false } : state;
        }
        default: {
          return state;
        }
      }
    },
    { errors: {}, values: initialValues, isValid: false }
  );

  const errors = state.errors;
  const values = state.values;
  const isValid = state.isValid;

  const handleChange = useCallback(event => {
    const _handleChange = ({ target: { name, value } }) => {
      dispatch({ type: SET_VALUE, name, value });
      setCurrentField(name);
    };
    _handleChange(event);
  }, []);

  /**
   * Only validate field if ...
   * - handleChange is called with a field name matching one already set in values
   * - validationSchema exists
   * - validationSchema has a field matching currentField
   */
  useEffect(() => {
    if (
      objectIncludes(values, currentField) &&
      validationSchema &&
      validationSchema.fields[currentField]
    ) {
      dispatch({ type: SET_NOT_VALID });
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        validationSchema
          .validateAt(currentField, values)
          .then(() => {
            dispatch({ type: REMOVE_ERROR, currentField });
            validationSchema.isValid(values).then(valid => valid && dispatch({ type: SET_VALID }));
          })
          .catch(error => {
            dispatch({ type: ADD_ERROR, error, currentField });
            dispatch({ type: SET_NOT_VALID });
          });
      }, delay);
    }
  }, [values, validationSchema, currentField, delay]);

  !isInitialValidationDone &&
    validationSchema &&
    validationSchema.isValid(values).then(valid => {
      dispatch(valid ? { type: SET_VALID } : { type: SET_NOT_VALID });
      setInitialValidationDone(true);
    });

  return { isValid, values, errors, handleChange };
};

export default useFormValidation;
