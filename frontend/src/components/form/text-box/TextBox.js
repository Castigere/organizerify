import styled from 'styled-components';

const TextBox = styled.div`
  background: white;
  width: 94%;
  margin-top: 2em;
  margin-bottom: 2em;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 3%;
  @media only screen and (max-width: 57em) {
    margin-top: 0;
  }
`;

export default TextBox;
