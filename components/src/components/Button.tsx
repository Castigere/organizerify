import React from 'react';
import styled, { css } from 'styled-components';

import Tooltip from './Tooltip';

interface StyledButtonProps {
  right: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
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

export interface ButtonProps {
  tooltip?: string;
  disabled?: boolean;
  right?: boolean;
  onClick?: () => void;
}

const Button = ({ disabled, tooltip, right, ...props }: ButtonProps) =>
  tooltip && !disabled ? (
    <Tooltip arrow text={tooltip} enterDelay={500}>
      <StyledButton right={right ? true : false} {...props}></StyledButton>
    </Tooltip>
  ) : (
    <StyledButton right={right ? true : false} disabled={disabled ? true : false} {...props} />
  );

export default Button;
