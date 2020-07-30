import styled from 'styled-components';

const InputBase = styled.input`
  font-size: 1em;
  width: 70%;
  height: 2em;
  margin: 1em;
  margin-bottom: 1.3em;
  border: 0;
  border: 1px solid #cccc;
  float: right;
  border-radius: 3px;

  &:focus {
    border: 1px solid #2c3e50;
  }

  @media only screen and (max-width: 57em) {
    padding: 0;
    width: 99%;
    margin: 0;
    margin-top: 1em;
    margin-bottom: 1.1em;
  }
`;

export default InputBase;
