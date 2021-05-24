import { Card, Container, Grid, Loader } from "semantic-ui-react";
import { Item } from "../../graphql/schemas";

type ItemsDisplayProps = {
  items?: Array<Item> | null;
  loading: boolean;
};

const ItemsDisplay = ({ items, loading }: ItemsDisplayProps) => {
  return (
    <Container>
      <Grid stretched padded>
        {loading ? (
          <Loader active center />
        ) : (
          <Grid.Row>
            <div className="ui centered cards">
              {items?.map((item) => (
                <Card
                  header={item.name}
                  description={"Paid $" + item.price}
                  meta={"Current cost $" + item.cost}
                  key={item.id}
                />
              ))}
            </div>
          </Grid.Row>
        )}
      </Grid>
    </Container>
  );
};

export { ItemsDisplay };
