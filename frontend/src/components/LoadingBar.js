import styled from 'styled-components';

const LoadingBar = styled.div`
  .loader {
    height: 2px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #ddd;
  }
  .loader::before {
    display: block;
    position: absolute;
    content: '';
    left: -200px;
    width: 200px;
    height: 2px;
    background-color: #414141;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    from {
      left: -200px;
      width: 0%;
    }
    50% {
      width: 30%;
    }
    70% {
      width: 70%;
    }
    80% {
      left: 50%;
    }
    95% {
      left: 120%;
    }
    to {
      left: 100%;
    }
  }
`;

export default LoadingBar;
