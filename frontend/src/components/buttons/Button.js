import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Tooltip } from 'components';

const StyledButton = styled.button`
  border: 1px solid black;
  background: inherit;
  height: 2.5em;
  width: 10em;
  cursor: pointer;

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    color: white;
    background: ${props => props.theme.ACCENT};
  }

  &:focus {
    border-inline: 2px solid black;
    border-radius: 2px;
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid lightgrey;
  }

  @media only screen and (max-width: 57em) {
    float: right;
    height: 3em;
    width: 50%;
    font-size: 1em;
    margin-bottom: 1em;
  }

  ${({ right }) =>
    right &&
    css`
      float: right;
    `}
`;

const Button = ({ disabled, tooltip, ...props }) =>
  tooltip && !disabled ? (
    <Tooltip arrow text={tooltip} enterDelay={500}>
      <StyledButton {...props} />
    </Tooltip>
  ) : (
    <StyledButton disabled={disabled ? true : false} {...props} />
  );

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string
};

export default Button;
