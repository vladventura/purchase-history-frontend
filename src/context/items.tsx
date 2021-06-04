import { createContext, useReducer } from "react";
import { Item } from "../graphql/schemas";
import { SortTypes, sorter } from "../utils/sorter";

type ItemsState = {
  items: [Item] | [] | undefined;
  setItems: (items?: [Item] | undefined, sort?: SortTypes) => void;
};

const initState: ItemsState = {
  items: [],
  setItems: (items?: [Item] | undefined, sort?: SortTypes) => {},
};

export const ItemsContext = createContext(initState);

const itemsReducer = (
  state: { items: [] },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const ItemsProvider = (props: Object) => {
  const [state, dispatch] = useReducer(itemsReducer, initState);

  const setItems = (items?: [Item] | undefined, sort?: SortTypes) => {
    // This way we avoid passing in the items from the ProfileBanner.
    // Still need a way to set the initial items
    const sortedItems = sorter(items || state.items, sort);
    dispatch({
      type: "SET_ITEMS",
      payload: sortedItems,
    });
  };

  return (
    <ItemsContext.Provider
      value={{
        items: state.items,
        setItems,
      }}
      {...props}
    ></ItemsContext.Provider>
  );
};
