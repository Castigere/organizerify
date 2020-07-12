import styled from 'styled-components';

const BlockQuote = styled.blockquote`
  color: #2c3e50;
  font-size: 36px;
  line-height: 100%;
  position: relative;
  font-family: Georgia, serif;
  max-width: 15em;
  margin: 10% auto;
  &::before {
    content: open-quote;
    position: absolute;
    color: ${props => props.theme.accent};
    top: -10px;
    left: -0.3em;
    font-family: Arial, sans-serif;
    font-size: 82px;
    font-style: normal;
  }
  &::after {
    content: close-quote;
    position: absolute;
    color: ${props => props.theme.accent};
    bottom: -60px;
    font-family: Arial, sans-serif;
    font-size: 82px;
    font-style: normal;
  }
`;

export default BlockQuote;
