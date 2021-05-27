import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { ItemErrorsType, ItemFormType } from "../common/types";
import { AuthContext } from "../context/auth";
import { ADD_ITEM_MUTATION, UPDATE_ITEM_MUTATION } from "../graphql/mutations";
import { GetItemsQuery, GET_ITEMS_QUERY } from "../graphql/queries";
import { Item } from "../graphql/schemas";
import { OnForm } from "../utils/hooks";
import { ErrorsBlock } from "./ErrorsBlock";

type ItemFormProps = {
  item?: Item;
  modalClose?: Function;
  messageShow?: Function;
};

export const ItemForm = ({ item, modalClose, messageShow }: ItemFormProps) => {
  const MUTATION = item ? UPDATE_ITEM_MUTATION : ADD_ITEM_MUTATION;

  const initState: ItemFormType = {
    name: MUTATION === UPDATE_ITEM_MUTATION ? item?.name : "",
    cost: MUTATION === UPDATE_ITEM_MUTATION ? item?.cost : 0,
    price: MUTATION === UPDATE_ITEM_MUTATION ? item?.price : 0,
  };

  const [errors, setErrors] = useState({} as ItemErrorsType);

  const { onSubmit, values, onChange } = OnForm(editOrAddItem, initState);

  const { addItem, editItem } = useContext(AuthContext);

  const update = (
    proxy: ApolloCache<any>,
    result: FetchResult<any, Record<string, any>, Record<string, any>>
  ) => {
    if (MUTATION === ADD_ITEM_MUTATION) {
      const data: GetItemsQuery | null = proxy.readQuery({
        query: GET_ITEMS_QUERY,
      });
      proxy.writeQuery({
        query: GET_ITEMS_QUERY,
        data: {
          ...data,
          getItems: [result.data?.addItem, ...(data?.getItems as [Item])],
        },
      });
      addItem(result.data?.addItem as Item);
    } else {
      const newItem = {
        id: item?.id,
        cost: (values as ItemFormType)?.cost,
        price: (values as ItemFormType)?.price,
        name: (values as ItemFormType)?.name,
      } as Item;
      const data: GetItemsQuery | null = proxy.readQuery({
        query: GET_ITEMS_QUERY,
      });
      proxy.writeQuery({
        query: GET_ITEMS_QUERY,
        data: {
          ...data,
          getItems: [
            newItem,
            ...(data?.getItems as [Item]).filter((itm) => itm.id !== item?.id),
          ],
        },
      });
      editItem(item!, newItem);
    }
    modalClose?.();
    messageShow?.();
  };

  const [editOrAdd, { loading }] = useMutation(MUTATION, {
    variables: values,
    update,
    onError: (error) => {
      const errs = error.graphQLErrors[0].extensions?.exception.errors;
      setErrors(errs);
    },
  });

  function editOrAddItem() {
    editOrAdd();
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        noValidate
        className={"ui large form " + (loading ? "loading" : "")}
      >
        <div className="ui segment">
          <Form.Input
            placeholder="Item Name"
            label="Item Name"
            name="name"
            onChange={onChange}
            value={(values as ItemFormType).name}
            error={errors.name ? true : false}
            iconPosition="left"
            icon={<i className="pencil alternate icon" />}
          />
          <Form.Input
            placeholder="What you paid for the item"
            label="What you paid for the item"
            name="price"
            onChange={onChange}
            value={(values as ItemFormType).price}
            error={errors.price ? true : false}
            type="number"
            iconPosition="left"
            icon={<i className="dollar sign icon" />}
          />
          <Form.Input
            placeholder="What it currently costs"
            label="What it currently costs"
            name="cost"
            onChange={onChange}
            value={(values as ItemFormType).cost}
            error={errors.cost ? true : false}
            type="number"
            iconPosition="left"
            icon={<i className="dollar sign icon" />}
          />
          <Button fluid type="submit" primary className="button">
            Save Item
          </Button>
        </div>
      </Form>
      <ErrorsBlock errors={errors} />
    </>
  );
};

{
  /* 

<div className="ui segment">
  <Form.Input
    placeholder="Item Name"
    label="Item Name"
    name="name"
    onChange={onChange}
    value={(values as ItemFormType).name}
    error={errors.name ? true : false}
    iconPosition="left"
    icon={<i className="pencil alternate icon" />}
  />
  <Form.Input
    placeholder="What you paid for the item"
    label="What you paid for the item"
    name="price"
    onChange={onChange}
    value={(values as ItemFormType).price}
    error={errors.price ? true : false}
    type="number"
    iconPosition="left"
    icon={<i className="dollar sign icon" />}
  />
  <Form.Input
    placeholder="What it currently costs"
    label="What it currently costs"
    name="cost"
    onChange={onChange}
    value={(values as ItemFormType).cost}
    error={errors.cost ? true : false}
    type="number"
    iconPosition="left"
    icon={<i className="dollar sign icon" />}
  />
  <Button fluid type="submit" primary className="button">
    Save Item
  </Button>
</div>
</Form> */
}
