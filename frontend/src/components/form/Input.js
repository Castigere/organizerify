import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Tooltip } from 'components';
import { FieldsetContext } from './Fieldset';
import InputBase from './InputBase';

const InputStyle = styled(InputBase)``;

const Label = styled.label`
  width: 94%;
  background: inherit;
  float: left;
  border-left: 2px solid ${props => props.theme.ACCENT};
  padding-left: 3%;
  margin-left: 2%;
  line-height: 3.6em;

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
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 0.5em;
    margin-bottom: 0;
    float: node;
    line-height: 0;
    border-left: 0 solid white;
  }
`;

const Input = ({ label, error, focus, ...props }) => {
  const fieldsetIsCollapsed = useContext(FieldsetContext);

  const [isTooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    setTooltipOpen(!fieldsetIsCollapsed && error ? true : false);
  }, [error, fieldsetIsCollapsed]);

  return (
    <>
      <Label error={error}>
        {label}
        <Tooltip text={error} open={isTooltipOpen} arrow>
          <InputStyle ref={focus} {...props} />
        </Tooltip>
      </Label>
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  focus: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ])
};

export default Input;
