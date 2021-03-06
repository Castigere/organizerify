import gql from 'graphql-tag';

const getCurrentUser = gql`
  query User {
    getCurrentUser {
      displayName
      email
      firstName
      mobileNumber
      id
      lastName
      middleName
      role
      status
      type
    }
  }
`;

export default getCurrentUser;
