import gql from "graphql-tag";
import { User } from "./schemas";

export type UserRegisterMutation = {
  data: {
    register: User;
  };
};

export const REGISTER_USER_MUTATION = gql`
  mutation (
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

export const LOGIN_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login
  }
`;
