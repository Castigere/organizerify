import { useState, useEffect, useReducer } from 'react';

const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';

const useFormValidation = (initialValues, validationSchema) => {
  const [isInitialValidationDone, setInitialValidationDone] = useState(false);
  const [values, setValue] = useState(initialValues);
  const [isValid, setValidity] = useState(false);
  const [currentField, setCurrentField] = useState();
  const [errors, dispatchError] = useReducer((errors, action) => {
    switch (action.type) {
      case ADD_ERROR: {
        setValidity(false);
        return { ...errors, [action.currentField]: action.error.errors[0] };
      }
      case REMOVE_ERROR: {
        delete errors[currentField];
        Object.keys(errors).length === 0 && setValidity(true);
        return errors;
      }
      default: {
        return errors;
      }
    }
  }, {});

  const handleChange = ({ target: { name, value } }) => {
    setValue({ ...values, [name]: value });
    setCurrentField(name);
  };

  /**
   * Only validate field if ...
   * - handleChange is called with a field name matching one already set in values
   * - validationSchema exists
   * - validationSchema has a field matching currentField
   */
  useEffect(() => {
    Object.keys(values).includes(currentField) &&
      validationSchema &&
      validationSchema.fields[currentField] &&
      validationSchema
        .validateAt(currentField, values)
        .then(() => {
          dispatchError({ type: REMOVE_ERROR });
        })
        .catch(error => {
          dispatchError({ type: ADD_ERROR, error, currentField });
        });
  }, [values, validationSchema, currentField]);

  !isInitialValidationDone &&
    validationSchema &&
    validationSchema.isValid(values).then(valid => {
      valid ? setValidity(true) : setValidity(false);
      setInitialValidationDone(true);
    });

  return { isValid, values, errors, handleChange };
};

export default useFormValidation;
