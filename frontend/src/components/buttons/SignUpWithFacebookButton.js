import React from 'react';
// import styled from 'styled-components';

// const SignUpWithFacebookContainer = styled.div`
//   width: 14em;
//   display: flex;
//   border: 1px solid #ccc;
//   margin: 1.5em;
//   margin-top: 0;
//   cursor: pointer;
//   user-select: none;
//   @media only screen and (max-width: 57em) {
//     margin: 0;
//     margin-top: 0.5em;
//     width: 100%;
//   }
// `;

// const SignUpIcon = styled.svg`
//   float: left;
//   width: 1.5em;
//   padding: 0.6em;
//   padding-left: 1em;
// `;

// const SignUpText = styled.div`
//   float: right;
//   width: 100%;
//   padding-top: 0.75em;
//   padding-bottom: 0.6em;
// `;

const SignUpWithFacebookButton = ({ children, ...props }) => {
  return (
    // <SignUpWithFacebookContainer {...props}>
    //   <SignUpIcon height="25" fill="#3B5998" xmlns="http://www.w3.org/2000/svg">
    //     <path
    //       d="M20.3 4H4.7a.7.7 0 0 0-.7.7v15.6c0 .38.32.7.7.7h8.33v-6.38h-2.12v-2.65h2.12V9.84c0-2.2 1.4-3.27 3.35-3.27.94 0 1.75.07 1.98.1v2.3H17c-1.06 0-1.31.5-1.31 1.24v1.76h2.65l-.53 2.65H15.7l.04 6.38h4.56a.7.7 0 0 0 .71-.7V4.7a.7.7 0 0 0-.7-.7"
    //       fillRule="evenodd"
    //     ></path>
    //   </SignUpIcon>
    //   <SignUpText> Sign up with Facebook </SignUpText>
    // </SignUpWithFacebookContainer>
    <></>
  );
};

export default SignUpWithFacebookButton;
