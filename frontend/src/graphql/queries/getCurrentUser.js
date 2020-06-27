import gql from 'graphql-tag';

const getCurrentUser = gql`
  query User {
    getCurrentUser {
      displayName
      email
      firstName
      id
      lastName
      middleName
      role
    }
  }
`;

export default getCurrentUser;
