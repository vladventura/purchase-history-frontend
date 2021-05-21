import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, Container, Grid } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import "./Home.css";
import { Item } from "../graphql/schemas";
import { ProfileBanner } from "../components/ProfileBanner";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;

  const items: Array<Item> = [
    {
      name: "Item name",
      cost: 9.95,
      price: 15.99,
      id: "buSGbeouaob",
    },
    {
      name: "Item name",
      cost: 9.95,
      price: 15.99,
      id: "oa9brh",
    },
    {
      name: "Item name",
      cost: 9.95,
      price: 15.99,
      id: "rurewv",
    },
    {
      name: "Item name",
      cost: 9.95,
      price: 15.99,
      id: "egwiub",
    },
    {
      name: "Item name",
      cost: 9.95,
      price: 15.99,
      id: "oeirhn",
    },
  ];

  const ItemsDisplay = (
    <Container>
      <Grid stretched padded>
        <Grid.Row>
          <div className="ui centered cards">
            {items.map((itm) => (
              <Card
                header={itm.name}
                description={itm.price}
                meta={itm.cost}
                key={itm.id}
              />
            ))}
          </div>
        </Grid.Row>
      </Grid>
    </Container>
  );

  const home = (
    <Container fluid>
      <ProfileBanner user={user} />
      {ItemsDisplay}
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
