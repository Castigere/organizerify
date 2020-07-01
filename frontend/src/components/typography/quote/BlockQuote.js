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
    top: -10px;
    left: 0;
    font-family: Arial, sans-serif;
    font-size: 82px;
    font-style: normal;
  }
  &::after {
    content: close-quote;
    position: absolute;
    bottom: -60px;
    font-family: Arial, sans-serif;
    font-size: 82px;
    font-style: normal;
  }
`;

export default BlockQuote;
