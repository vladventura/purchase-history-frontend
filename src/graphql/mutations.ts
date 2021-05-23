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
      createdAt
      username
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
      username
      createdAt
      profile {
        totalCost
        totalPrice
        totalAddedItems
        createdAt
      }
    }
  }
`;
