import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Collapsible from 'react-collapsible';

const FieldsetStyle = styled.fieldset`
  margin: 10px;
  border: 0;
  border-bottom: 1px solid #cccc;
  padding-bottom: 1.3em;
  ${({ open }) =>
    !open &&
    css`
      padding-bottom: 0.3em;
      transition all 0.4s ease-in;
    `}
  @media only screen and (max-width: 57em) {
    margin: 0;
    margin-top: 1.5em;
  }
`;

const Legend = styled.legend`
  width: 100%;
  height: 1.5em;
  color: black;
  font-size: 1.1em;
  font-family: Georgia, serif;
  margin-left: 0;
  cursor: pointer;
  user-select: none;
  &::first-letter {
    font-size: 1.1em;
  }
  ${({ open }) => open && css``}
`;

const LegendText = styled.div`
  width: 80%;
  float: left;
  @media only screen and (max-width: 57em) {
    /* font-size: 4em; */
  }
`;

const Chevron = styled.div`
  float: right;
  position: relative;
  padding: 0;
  height: 1.1em;
  width: 2px;
  margin-left: 0;
  margin-top: 0;
  transform: rotate(270deg);
  transition: transform 0.1s ease-in;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 50%;
    width: 100%;
    background: ${props => props.theme.accent};
    transform: skew(40deg, 0deg);
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    height: 50%;
    width: 100%;
    background: ${props => props.theme.accent};
    transform: skew(-40deg, 0deg);
  }
  ${({ open }) =>
    open &&
    css`
      transform: rotate(90deg);
      transition: all 0.1s ease;
    `}
`;

const Fieldset = ({ children, legend, closed }) => {
  const [isCollapsed, setCollapsed] = useState(closed);

  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <FieldsetStyle open={!isCollapsed}>
      <Legend open={!isCollapsed} onClick={handleClick}>
        <LegendText>{legend}</LegendText>
        {legend && <Chevron open={!isCollapsed} />}
      </Legend>
      <Collapsible open={!isCollapsed} transitionTime={220}>
        {children}
      </Collapsible>
    </FieldsetStyle>
  );
};

export default Fieldset;
