import { Card, Container, Grid, Loader, Transition } from "semantic-ui-react";
import { Item } from "../../graphql/schemas";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

type ItemsDisplayProps = {
  items?: Array<Item> | null;
  loading: boolean;
};

const ItemsDisplay = ({ items, loading }: ItemsDisplayProps) => {
  const currency = Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container data-testid="items-display">
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
                    description={"Paid " + currency.format(item.price)}
                    meta={"Current cost " + currency.format(item.cost)}
                    key={item.id}
                    data-testid="items-display-item"
                    extra={
                      <div className="ui two buttons">
                        <EditButton item={item} />
                        <DeleteButton item={item} />
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
