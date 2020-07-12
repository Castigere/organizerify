import styled from 'styled-components';

const H1 = styled.h1`
  font-family: Georgia, serif;
  color: ${props => props.theme.headercolor};
  font-weight: 400;
  font-size: 3em;
  &::first-letter {
    font-size: 1.1em;
    font-family: garamond, bodoni, curly, times, serif;
  }
`;

export default H1;
