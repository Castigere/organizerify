import gql from 'graphql-tag';

const updateUser = gql`
  mutation User(
    $id: ID!
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $email: String!
    $mobileNumber: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      mobileNumber: $mobileNumber
    ) {
      displayName
      email
      firstName
      mobileNumber
      id
      lastName
      middleName
      role
    }
  }
`;

export default updateUser;
