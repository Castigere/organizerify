import useFormValidation from './useFormValidation';
import PrivateRoute from './PrivateRoute';
import { REGEXP_WHITESPACES, REGEXP_EMAIL } from './regexp';
import {
  doThenSetState,
  trimWhitespaces,
  objectLength,
  objectIncludes,
  getURLSearchParam
} from './helpers';

export {
  useFormValidation,
  PrivateRoute,
  REGEXP_EMAIL,
  REGEXP_WHITESPACES,
  doThenSetState,
  trimWhitespaces,
  objectLength,
  objectIncludes,
  getURLSearchParam
};
