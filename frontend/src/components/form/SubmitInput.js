import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Tooltip } from 'components';
import { FieldsetContext } from './Fieldset';

import arrow from 'assets/arrow-right-thin.svg';

const SubmitInputContainer = styled.span`
  width: 70%;
  height: 2em;
  margin: 1em;
  margin-bottom: 1.3em;
  float: right;
  border-radius: 3px;
  display: flex;
  &:focus {
    border: 1px solid #2c3e50;
    border-right: none;
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

const SubmitInputField = styled.input`
  font-size: 1em;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #cccc;
  border-radius: 3px;
  &:focus {
    border: 1px solid #2c3e50;
  }
`;

const SubmitInputBtn = styled.div`
  z-index: 1000;
  margin-left: -4.1em;
  height: 100%;
  width: 4.1em;
  float: right;
  border-left: 1px solid #2c3e50;
  border-radius: 4px;
  opacity: 0.1;
  user-select: none;
  &:hover {
    background: ${props => props.theme.ACCENT_INVERTED};
    filter: invert(100%);
  }
  ${({ isValid }) =>
    isValid &&
    css`
      opacity: 1;
      border: 1px solid #2c3e50;
      z-index: 10000;
      background: white;
      transition: opacity 0.2s;
      /* stylelint-disable */
      &:hover {
        cursor: pointer;
      }
      /* stylelint-enable */
    `}
`;

const SubmitArrow = styled.img`
  margin-left: 1.2em;
  margin-bottom: 0.295em;
  @media only screen and (max-width: 57em) {
    margin-bottom: 0;
    margin-top: 0.3em;
  }
`;

const Label = styled.label`
  width: 94%;
  background: inherit;
  float: left;
  border-left: 2px solid ${props => props.theme.ACCENT};
  padding-left: 3%;
  margin-left: 2%;
  line-height: 3.6em;
  transition: all 1s;

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

const SubmitInput = ({ label, error, focus, isValid, onSubmit, ...props }) => {
  const fieldsetIsCollapsed = useContext(FieldsetContext);

  const [isTooltipOpen, setOpenTooltip] = useState(false);

  useEffect(() => {
    setOpenTooltip(!fieldsetIsCollapsed && error ? true : false);
  }, [error, fieldsetIsCollapsed]);

  return (
    <Label error={error}>
      {label}:
      <Tooltip text={error} open={isTooltipOpen} arrow>
        <SubmitInputContainer>
          <SubmitInputField ref={focus} {...props} />
          <SubmitInputBtn isValid={isValid} onClick={event => onSubmit(event)}>
            <SubmitArrow src={arrow} alt="arrow" />
          </SubmitInputBtn>
        </SubmitInputContainer>
      </Tooltip>
    </Label>
  );
};

SubmitInput.defaultProps = {
  onSubmit: () => {},
  isValid: false
};

SubmitInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  focus: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ]),
  onSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired
};

export default SubmitInput;
