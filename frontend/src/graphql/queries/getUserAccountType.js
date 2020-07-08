import gql from 'graphql-tag';

const getUserAccountType = gql`
  query Account($email: String!) {
    getUserAccountType(email: $email) {
      type
      exists
      email
    }
  }
`;

export default getUserAccountType;
