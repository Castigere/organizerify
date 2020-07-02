import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  font-size: 1em;
  width: 70%;
  height: 2em;
  margin: 20px;
  border: 0;
  border: 1px solid #cccc;
  float: right;
  border-radius: 3px;
  &:focus {
    border: 1px solid #2c3e50;
  }
  @media only screen and (max-width: 57em) {
    width: 100%;
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

const Input = ({ children, label }) => {
  return (
    <Label>
      {label}:<InputStyle>{children}</InputStyle>
    </Label>
  );
};

export default Input;
