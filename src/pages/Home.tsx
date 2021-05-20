import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Container, Grid, Header } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import "./Home.css";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;

  // Should parse this from the user incoming from the context
  const items = [
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

  const ProfileCard = (
      <Grid padded stretched className="segment">
        <Grid.Row divided stretched verticalAlign="middle" style={{
          justifyContent:"space-evenly"
        }}>
          <Grid.Column width={8}>
            <Container fluid>
              <Header>{user?.username}</Header>
              <Card.Description>
                {"Joined " + moment(user?.profile?.createdAt).fromNow(false)}
              </Card.Description>
            </Container>
          </Grid.Column>

          <Grid.Column width={8}>
            <Card.Group centered items={items} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );

  const ItemsDisplay = (
    <Card fluid raised>
      <CardContent>
        <Card.Header>{user?.username}</Card.Header>
        <Card.Meta>{moment(user?.createdAt).fromNow(false)}</Card.Meta>
        <Card.Description>
          <Card.Group centered items={items} />
        </Card.Description>
      </CardContent>
    </Card>
  );

  const home = (
    <Container fluid>
      {ProfileCard}
      <Grid stretched>
        {/* <Grid.Row>
          <Container className="segment" fluid textAlign="center">
            {ProfileCard}
          </Container>
        </Grid.Row> */}
        <Grid.Row>{ItemsDisplay}</Grid.Row>
      </Grid>
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
