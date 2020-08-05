import { REGEXP_WHITESPACES } from 'utils';

const doThenSetState = async (operation, args, setter) => {
  const result = await operation(args);
  console.log('getter', result);
  setter(result);
};

const getURLSearchParam = param => new URL(window.location.href).searchParams.get(param);

const trimWhitespaces = string => string.replace(/ /g, '');

const objectLength = obj => Object.keys(obj).length;

const objectIncludes = (obj, key) => Object.keys(obj).includes(key);

const forWhitespaces = message => ['', message, value => REGEXP_WHITESPACES.test(value)];

export {
  doThenSetState,
  trimWhitespaces,
  objectLength,
  objectIncludes,
  getURLSearchParam,
  forWhitespaces
};
