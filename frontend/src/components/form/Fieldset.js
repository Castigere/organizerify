import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
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
  cursor: ${({ collapsible }) => (collapsible ? 'pointer' : 'null')};
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
  transform: rotate(90deg);
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
      transform: rotate(270deg);
      transition: all 0.1s ease;
    `}
`;

export const FieldsetContext = createContext(false);

const Fieldset = ({ children, legend, closed, collapsible }) => {
  const [isCollapsed, setCollapsed] = useState(closed);

  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <FieldsetStyle open={!isCollapsed}>
      {collapsible && legend && (
        <Legend open={!isCollapsed} onClick={handleClick} collapsible={collapsible}>
          <LegendText>{legend}</LegendText>
          <Chevron open={!isCollapsed} />
        </Legend>
      )}
      {!collapsible && legend && (
        <Legend collapsible={collapsible}>
          <LegendText>{legend}</LegendText>
        </Legend>
      )}
      <Collapsible open={!isCollapsed} transitionTime={220}>
        <FieldsetContext.Provider value={isCollapsed}>{children}</FieldsetContext.Provider>
      </Collapsible>
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
  closed: PropTypes.bool,
  collapsible: PropTypes.bool
};

export default Fieldset;
