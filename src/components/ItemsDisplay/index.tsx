import {
  Card,
  Container,
  Grid,
  Button,
  Loader,
  Transition,
} from "semantic-ui-react";
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
                        <Button basic color="red">
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
