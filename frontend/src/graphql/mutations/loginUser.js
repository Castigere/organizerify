import gql from 'graphql-tag';

const loginUser = gql`
  mutation User($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      displayName
      firstName
      middleName
      lastName
      email
      role
    }
  }
`;

export default loginUser;
