import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
// import Tooltip from '@material-ui/core/Tooltip';

import { Tooltip } from 'components';

import { FieldsetContext } from './Fieldset';

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
  width: 94%;
  background: inherit;
  float: left;
  border-left: 2px solid ${props => props.theme.accent};
  padding-left: 3%;
  margin-left: 2%;
  line-height: 3.6em;
  ${({ error }) =>
    error &&
    css`
      border-left: 3px solid #c81c1c;
      box-shadow: 0 0 1px rgba(10, 0, 0, 0.3);
      transition: box-shadow 0.3s ease-in;
      transition: border-left 0.3s ease-in;
      @media only screen and (max-width: 57em) {
        border-left: 3px solid #c81c1c;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        border-left: 0 solid white;
      }
    `}
  @media only screen and (max-width: 57em) {
    padding-top: 0.5em;
    margin-bottom: 0;
    float: node;
    line-height: 0;
    border-left: 0 solid white;
  }
`;

const Input = ({ label, error, focus, ...props }) => {
  const fieldsetIsCollapsed = useContext(FieldsetContext);

  const [isTooltipOpen, setOpenTooltip] = useState(false);

  useEffect(() => {
    setOpenTooltip(!fieldsetIsCollapsed && error ? true : false);
  }, [error, fieldsetIsCollapsed]);

  return (
    <>
      <Label error={error}>
        {label}:
        <Tooltip text={error} open={isTooltipOpen} arrow>
          <InputStyle ref={focus} {...props} />
        </Tooltip>
      </Label>
    </>
  );
};

export default Input;
