import gql from 'graphql-tag';

const setNewUserPassword = gql`
  mutation Account($id: ID!, $currentPassword: String!, $newPassword: String!) {
    setNewUserPassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
      isPasswordSet
    }
  }
`;

export default setNewUserPassword;
