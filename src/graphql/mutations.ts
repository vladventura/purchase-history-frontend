import gql from "graphql-tag";
export const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      token
      profile {
        totalCost
        totalPrice
        totalAddedItems
      }
    }
  }
`;
