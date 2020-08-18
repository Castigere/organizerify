import React from 'react';
import PropTypes from 'prop-types';
import MaterialTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  tooltip: {
    fontSize: '0.8em',
    top: '-10px',
    padding: '0.5em',
    borderRadius: '2px',
    background: 'black'
  },
  arrow: {
    color: 'black'
  }
};

const StyledTooltip = withStyles(styles)(MaterialTooltip);

const Tooltip = ({ text, open, children, ...props }) => {
  return (
    <StyledTooltip title={text} open={open} {...props}>
      {children}
    </StyledTooltip>
  );
};

Tooltip.defaultProps = {
  text: 'Information'
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  open: PropTypes.bool,
  arrow: PropTypes.bool
};

export default Tooltip;
