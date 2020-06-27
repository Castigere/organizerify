import PropTypes from 'prop-types';

export const nestedObjectsOfFuncsPT = PropTypes.objectOf(
  PropTypes.objectOf(PropTypes.func.isRequired)
);
export const objectOfFuncsPT = PropTypes.objectOf(PropTypes.func.isRequired);
