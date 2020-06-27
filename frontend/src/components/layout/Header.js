import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { UserStatusWidget } from 'components/widgets';

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  height: 5em;
  background: white;
  color: black;
  display: grid;
  grid-template-columns: 1fr 55em 1fr;
  background-color: #fff;
  border-bottom: 1px solid #d6dce5;

  @media only screen and (max-width: 57em) {
    grid-template-columns: 100%;
  }

  ${({ styled: { scrolling } }) =>
    scrolling &&
    css`
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      transition: box-shadow 0.2s ease-in;
    `}
`;

const RightHeaderContainer = styled.div`
  color: inherit;
`;

const LeftHeaderContainer = styled.div`
  color: inherit;
`;

const CenterHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: right;

  @media only screen and (max-width: 57em) {
    width: 100%;
    grid-template-columns: 75% 4em;
  }
`;

const Debug = styled.div`
  background: inherit;
`;

const Header = () => {
  const [style, setStyle] = useState({ scrolling: false });

  useEffect(() => {
    const checkScrolling = () =>
      document.scrollingElement.scrollTop >= 30 && !style.scrolling
        ? setStyle({ scrolling: true })
        : setStyle({ scrolling: false });
    !style.scrolling && document.addEventListener('scroll', () => checkScrolling());
    return document.removeEventListener('scroll', () => checkScrolling());
  }, [style.scrolling]);

  return (
    <StyledHeader styled={style}>
      <RightHeaderContainer />
      <CenterHeaderContainer>
        <Debug />
        <UserStatusWidget />
      </CenterHeaderContainer>
      <LeftHeaderContainer />
    </StyledHeader>
  );
};

export default Header;
