import React from 'react';
import PropTypes from 'prop-types';

import MaterialTooltip from '@material-ui/core/Tooltip';

const Tooltip = ({ text, open, children, ...props }) => {
  return (
    <MaterialTooltip title={text} open={open} {...props}>
      {children}
    </MaterialTooltip>
  );
};

Tooltip.defaultProps = {
  text: 'There is nothing permanent except change.'
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  open: PropTypes.bool
};

export default Tooltip;
