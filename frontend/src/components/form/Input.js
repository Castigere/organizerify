import React from 'react';
import styled, { css } from 'styled-components';

const InputStyle = styled.input`
  font-size: 1em;
  width: 70%;
  height: 2em;
  margin: 1em;
  margin-bottom: 1.3em;
  border: 0;
  border: 1px solid #cccc;
  float: right;
  border-radius: 3px;
  &:focus {
    border: 1px solid #2c3e50;
  }
  
  /* ${({ isValid }) => {
    if (isValid === 'undefined') return null;

    if (isValid === false)
      return css`
        background: red;
      `;

    if (isValid === true)
      return css`
        background: inherit;
      `;
  }} */
  @media only screen and (max-width: 57em) {
    width: 100%;
    margin: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 1em;
    margin-bottom: 1.1em;
  }
`;

const Label = styled.label`
  /* font-weight: bold; */
  width: 100%;
  background: inherit;
  float: left;
  margin-left: 2%;
  margin-top: 1%;
  line-height: 3.6em;
  @media only screen and (max-width: 57em) {
    float: node;
    line-height: 0;
  }
`;

const Error = styled.div`
  color: darkred;
  float: right;
  margin-top: -1.3em;
  @media only screen and (max-width: 57em) {
    margin-top: -1.2em;
  }
`;

const Input = ({ children, label, error, ...props }) => {
  return (
    <>
      <Label>
        {label}:<InputStyle {...props}>{children}</InputStyle>
      </Label>
      <Error>{error}</Error>
    </>
  );
};

export default Input;
