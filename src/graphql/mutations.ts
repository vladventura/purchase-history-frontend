import gql from "graphql-tag";
import { User } from "./schemas";

export type UserMutation = {
  data: {
    register?: User;
    login?: User;
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
    login(username: $username, password: $password) {
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
