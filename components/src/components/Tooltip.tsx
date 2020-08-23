import React from 'react';
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

export interface TooltipProps {
  arrow: boolean;
  text: string;
  open?: boolean;
  enterDelay?: number;
  children: any;
}

const Tooltip = ({ text = 'Information', open, children, arrow, ...props }: TooltipProps) => {
  return (
    <StyledTooltip arrow={arrow} title={text} open={open} {...props}>
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
