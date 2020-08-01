import styled from 'styled-components';

const HorizontallyAlign = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media only screen and (max-width: 57em) {
    display: inline-block;
    width: 100%;
  }
`;

export default HorizontallyAlign;
