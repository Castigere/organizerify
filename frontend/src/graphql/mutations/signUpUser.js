import gql from 'graphql-tag';

const signUpUser = gql`
  mutation User($email: String!, $password: String!) {
    signUpUser(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      status
    }
  }
`;

export default signUpUser;
