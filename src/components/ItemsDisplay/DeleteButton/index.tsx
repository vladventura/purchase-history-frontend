import { Button, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_ITEM_MUTATION } from "../../../graphql/mutations";
import { GET_ITEMS_QUERY } from "../../../graphql/queries";
import { Item } from "../../../graphql/schemas";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth";

type DeleteButtonProps = {
  item: Item;
};

export const DeleteButton = ({ item }: DeleteButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { removeItem } = useContext(AuthContext);
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    variables: {
      itemId: item.id,
    },
    update: (proxy) => {
      const data = proxy.readQuery({
        query: GET_ITEMS_QUERY,
      }) as { getItems: [Item] };
      proxy.writeQuery({
        query: GET_ITEMS_QUERY,
        data: {
          ...data,
          getItems: [...data.getItems.filter((itm) => itm.id !== item.id)],
        },
      });
      removeItem(item);
      setShowConfirm(false);
    },
  });
  return (
    <>
      <Button basic color="red" onClick={() => setShowConfirm(true)}>
        Delete
      </Button>
      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => deleteItem()}
        content="Are you sure you want to delete this item? This action is irreversible"
      />
    </>
  );
};
