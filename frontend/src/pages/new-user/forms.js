import { useState } from 'react';

const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValue] = useState(initialValues);
  const [errors, setError] = useState({});
  const [isValid, setValidity] = useState(false);

  const handleChange = ({ target: { name, value } }) => setValue({ ...values, [name]: value });

  const handleBlur = ({ target: { name } }) => {
    validationSchema &&
      validationSchema
        .validateAt(name, values)
        .then(() => {
          delete errors[name];
          setError({ ...errors });
        })
        .catch(error => {
          setError({ ...errors, [name]: error.errors[0] });
        });
  };

  validationSchema &&
    validationSchema
      .isValid(values)
      .then(valid => (valid ? setValidity(true) : setValidity(false)));

  return { isValid, values, errors, handleChange, handleBlur };
};

export { useFormValidation };
