import styled from 'styled-components';

const FirstParagraph = styled.p`
  &::first-letter {
    color: ${props => props.theme.accent};
    font-size: 5em;
    font-family: Georgia, serif;
    float: left;
    line-height: 0.6em;
  }
`;

export default FirstParagraph;
