import { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Header,
} from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import "./Home.css";
import { Item } from "../graphql/schemas";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }

  // Should parse this from the user incoming from the context
  const info = [
    {
      header: "Items added",
      meta: "",
      description: user?.profile?.totalAddedItems,
    },
    {
      header: "Price paid",
      meta: "",
      description: user?.profile?.totalPrice,
    },
    {
      header: "Current cost",
      meta: "",
      description: user?.profile?.totalCost,
    },
  ];
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

  const ProfileCard = (
    <Grid padded stretched className="segment" >
      <Grid.Row
        divided
        stretched
        verticalAlign="middle"
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Grid.Column width={8} stretched textAlign="center" style={{
          height: "100%"
        }}>
          <Container style={containerStyle}>
            <Header>{user?.username}</Header>
            <Card.Description>
              {"Joined " + moment(user?.profile?.createdAt).fromNow(false)}
            </Card.Description>
          </Container>

          <Container style={containerStyle}>
            <Button>Add an item</Button>
          </Container>
        </Grid.Column>

        <Grid.Column width={8}>
          <Card.Group centered items={info} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

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
      {ProfileCard}
      {ItemsDisplay}
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
