import useFormValidation from './useFormValidation';
import useS3FileStorage from './useS3FileStorage';
import PrivateRoute from './PrivateRoute';
import { REGEXP_WHITESPACES, REGEXP_EMAIL } from './regexp';
import {
  doThenSetState,
  trimWhitespaces,
  objectLength,
  objectIncludes,
  getURLSearchParam,
  forWhitespaces
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
  getURLSearchParam,
  forWhitespaces,
  useS3FileStorage
};
