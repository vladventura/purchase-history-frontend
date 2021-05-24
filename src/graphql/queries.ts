import gql from "graphql-tag"
import { Item } from "./schemas";

export const GET_ITEMS_QUERY = gql`
    query {
        getItems {
            name
            price
            cost
            id
            createdAt
        }
    }
`;

export type GetItemsQuery = {
    getItems?: [Item];
}