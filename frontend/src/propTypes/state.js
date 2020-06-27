import PropTypes from 'prop-types';

const statePT = PropTypes.shape({
  auth: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  preload: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  submit: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
});

export default statePT;
