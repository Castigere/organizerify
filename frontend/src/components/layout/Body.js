import styled from 'styled-components';

const Body = styled.div`
  background: #edf0f3;
  padding-top: 5em;
  min-height: 74.5vh;
  display: grid;
  grid-template-columns: 1fr 55em 1fr;

  @media only screen and (max-width: 57em) {
    grid-template-columns: 100%;
  }
`;

export default Body;
