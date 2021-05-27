import gql from "graphql-tag";
import { User } from "./schemas";

export type UserMutation = {
  data: {
    register?: User;
    login?: User;
  };
};

export const ADD_ITEM_MUTATION = gql`
  mutation ($name: String!, $price: Float!, $cost: Float!) {
    addItem(name: $name, price: $price, cost: $cost) {
      id
      name
      price
      cost
      createdAt
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation($itemId: ID!, $name: String!, $price: Float!, $cost: Float!) {
    updateItem(itemId: $itemId, name: $name, price: $price, cost: $cost)
  }

`;

export const DELETE_ITEM_MUTATION = gql`
  mutation ($itemId: ID!){
    deleteItem(itemId: $itemId)
  }
`;

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
