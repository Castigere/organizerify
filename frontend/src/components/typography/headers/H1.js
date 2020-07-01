import styled from 'styled-components';

const H1 = styled.h1`
  font-family: Georgia, serif;
  color: #2c3e50;
  font-weight: 400;
  font-size: 3em;
  text &::first-letter {
    font-size: 2.5em;
    font-family: garamond, bodoni, curly, times, serif;
  }
`;

export default H1;
