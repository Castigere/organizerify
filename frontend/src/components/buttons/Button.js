import React from 'react';
import styled, { css } from 'styled-components';

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
    background: ${props => props.theme.accent};
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
    height: 4em;
    width: 50%;
    font-size: 1em;
  }

  ${({ right }) =>
    right &&
    css`
      float: right;
    `}
`;

const Button = ({ children, disabled, ...props }) =>
  disabled ? (
    <StyledButton disabled {...props}>
      {children}
    </StyledButton>
  ) : (
    <StyledButton {...props}>{children}</StyledButton>
  );

export default Button;
