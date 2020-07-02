import React from 'react';
import styled from 'styled-components';

const FieldsetStyle = styled.fieldset`
  margin: 40px;
  margin-left: 10px;
  border: 0;
  border-bottom: 1px solid #cccc;
  @media only screen and (max-width: 57em) {
    margin: 0;
  }
`;

const Legend = styled.legend`
  color: black;
  font-size: 1.3em;
  font-family: Georgia, serif;
  margin-left: 0;
  &::first-letter {
    font-size: 1.1em;
    color: #2c3e50;
  }
`;

const Fieldset = ({ children, legend }) => (
  <FieldsetStyle>
    <Legend>{legend}</Legend>
    {children}
  </FieldsetStyle>
);

export default Fieldset;
