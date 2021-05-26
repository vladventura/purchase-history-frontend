import { useMutation } from "@apollo/client";
import {
  Card,
  Container,
  Grid,
  Button,
  Loader,
  Transition,
} from "semantic-ui-react";
import { DELETE_ITEM_MUTATION } from "../../graphql/mutations";
import { GET_ITEMS_QUERY } from "../../graphql/queries";
import { Item } from "../../graphql/schemas";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";

type ItemsDisplayProps = {
  items?: Array<Item> | null;
  loading: boolean;
};

const ItemsDisplay = ({ items, loading }: ItemsDisplayProps) => {
  const [deleteItem, { loading: loadingMutation }] = useMutation(
    DELETE_ITEM_MUTATION,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const { removeItem } = useContext(AuthContext);

  return (
    <Container>
      <Grid stretched padded>
        {loading ? (
          <Loader active />
        ) : (
          <Grid.Row>
            <div className="ui centered cards">
              <Transition.Group>
                {items?.map((item) => (
                  <Card
                    header={item.name}
                    description={"Paid $" + item.price}
                    meta={"Current cost $" + item.cost}
                    key={item.id}
                    extra={
                      <div className="ui two buttons">
                        <Button basic color="blue">
                          Edit
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={(_) =>
                            deleteItem({
                              variables: { itemId: item.id },
                              update: (proxy) => {
                                console.log(proxy);
                                const data = proxy.readQuery({
                                  query: GET_ITEMS_QUERY,
                                }) as { getItems: [Item] };
                                console.log(
                                  proxy.readQuery({ query: GET_ITEMS_QUERY })
                                );
                                data.getItems.filter((itm) => {
                                  console.log(itm.id);
                                  return true;
                                });
                                proxy.writeQuery({
                                  query: GET_ITEMS_QUERY,
                                  data: {
                                    ...data,
                                    getItems: [
                                      ...data.getItems.filter(
                                        (itm) => itm.id !== item.id
                                      ),
                                    ],
                                  },
                                });
                                removeItem(item);
                              },
                            })
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    }
                  />
                ))}
              </Transition.Group>
            </div>
          </Grid.Row>
        )}
      </Grid>
    </Container>
  );
};

export { ItemsDisplay };
