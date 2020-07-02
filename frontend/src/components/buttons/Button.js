import styled, { css } from 'styled-components';

const Button = styled.button`
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
    background: black;
  }

  &:focus {
    border-inline: 2px solid black;
    border-radius: 2px;
  }

  @media only screen and (max-width: 57em) {
    height: 3em;
  }

  ${({ right }) =>
    right &&
    css`
      float: right;
    `}
`;

export default Button;
