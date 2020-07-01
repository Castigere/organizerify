import styled from 'styled-components';

const Wrapper = styled.div`
  overflow-x: hidden;
  font-size: 100%;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  .center,
  .container {
    margin-left: auto;
    margin-right: auto;
  }
  p {
    font-size: 1.125rem;
    font-weight: 200;
    line-height: 1.8;
  }
  .font-light {
    font-weight: 300;
  }
  .font-regular {
    font-weight: 400;
  }
  .font-heavy {
    font-weight: 700;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
  .justify {
    text-align: justify;
  }
  .container {
    width: 90%;
  }
  .row {
    position: relative;
    width: 100%;
  }
  .row [class^='col'] {
    float: left;

    /* margin: 0.5rem 2%;
  min-height: 0.125rem; */
  }
  .col-1,
  .col-10,
  .col-11,
  .col-12,
  .col-2,
  .col-3,
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9 {
    width: 96%;
  }
  .col-1-sm {
    width: 4.33%;
  }
  .col-2-sm {
    width: 12.66%;
  }
  .col-3-sm {
    width: 21%;
  }
  .col-4-sm {
    width: 29.33%;
  }
  .col-5-sm {
    width: 37.66%;
  }
  .col-6-sm {
    width: 46%;
  }
  .col-7-sm {
    width: 54.33%;
  }
  .col-8-sm {
    width: 62.66%;
  }
  .col-9-sm {
    width: 71%;
  }
  .col-10-sm {
    width: 79.33%;
  }
  .col-11-sm {
    width: 87.66%;
  }
  .col-12-sm {
    width: 96%;
  }
  .row::after {
    content: '';
    display: table;
    clear: both;
  }
  .hidden-sm {
    display: none;
  }
  @media only screen and (min-width: 33.75em) {
    .container {
      width: 80%;
    }
  }
  @media only screen and (min-width: 45em) {
    .col-1 {
      width: 4.33%;
    }
    .col-2 {
      width: 12.66%;
    }
    .col-3 {
      width: 21%;
    }
    .col-4 {
      width: 29.33%;
    }
    .col-5 {
      width: 37.66%;
    }
    .col-6 {
      width: 46%;
    }
    .col-7 {
      width: 54.33%;
    }
    .col-8 {
      width: 62.66%;
    }
    .col-9 {
      width: 71%;
    }
    .col-10 {
      width: 79.33%;
    }
    .col-11 {
      width: 87.66%;
    }
    .col-12 {
      width: 96%;
    }
    .hidden-sm {
      display: block;
    }
  }
`;

export default Wrapper;
