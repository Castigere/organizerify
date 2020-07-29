import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

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

  /* ${({ fadeIn }) =>
    fadeIn &&
    css`
      opacity: 0;
      &:focus {
        border: 1px solid #2c3e50;
        opacity: 1;
        transition: opacity 0.5s;
      }
    `} */
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
  transition: all 1s;
  
  /* ${({ fadeIn }) =>
    fadeIn &&
    css`
      opacity: 1;
      transition: opacity 0.5s;
    `} */
  ${({ error }) =>
    error &&
    css`
      border-left: 3px solid #c81c1c;
      transition: all 0.3s ease-in;
      @media only screen and (max-width: 57em) {
        border-left: 3px solid #c81c1c;
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

const Input = ({ label, error, focus, fadeIn, ...props }) => {
  const fieldsetIsCollapsed = useContext(FieldsetContext);

  const [isTooltipOpen, setOpenTooltip] = useState(false);

  useEffect(() => {
    setOpenTooltip(!fieldsetIsCollapsed && error ? true : false);
  }, [error, fieldsetIsCollapsed]);

  return (
    <>
      <Label error={error} fadeIn={fadeIn ? true : false}>
        {label}:
        <Tooltip text={error} open={isTooltipOpen} arrow>
          <InputStyle fadeIn={fadeIn ? true : false} ref={focus} {...props} />
        </Tooltip>
      </Label>
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  focis: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ]),
  fadeIn: PropTypes.bool
};

export default Input;
