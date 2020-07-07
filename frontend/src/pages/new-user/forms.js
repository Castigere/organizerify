import { useState } from 'react';

const trimWhitespaces = string => string.replace(/ /g, '');

const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValue] = useState(initialValues);
  const [errors, setError] = useState({});

  const handleChange = ({ target: { name, value } }) =>
    setValue({ ...values, [name]: trimWhitespaces(value) });

  const handleBlur = ({ target: { name } }) => {
    validationSchema[name] &&
      validationSchema[name]
        .validate(values)
        .then(() => {
          delete errors[name];
          setError({ ...errors });
        })
        .catch(error => {
          setError({ ...errors, [name]: error.errors[0] });
        });
  };

  return { values, errors, handleChange, handleBlur };
};

export { useFormValidation };
