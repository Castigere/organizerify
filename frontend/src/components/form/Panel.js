import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  margin: 2em;
  margin-left: 3em;
  margin-right: 3em;
  border-radius: 4px;
`;

const PanelDecoration = styled.div`
  width: 0.5em;
  float: left;
  background: ${props => props.theme.ACCENT};
  font-size: 1em;
`;

const PanelText = styled.div`
  padding: 1em;
  border: 1px solid ${props => props.theme.ACCENT};
`;

const Panel = ({ children, ...props }) => {
  return (
    <PanelContainer>
      <PanelDecoration></PanelDecoration>
      <PanelText {...props}> {children}</PanelText>
    </PanelContainer>
  );
};

export default Panel;
