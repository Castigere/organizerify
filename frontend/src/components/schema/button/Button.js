import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid black;
  background: inherit;
  height: 50%;
  width: 10em;
  cursor: pointer;

  &:hover {
    color: white;
    background: black;
  }
`;

export default Button;
