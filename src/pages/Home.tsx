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
    // {console.log(user)}
    // <Card fluid raised>
    //   <CardContent>
    //     <Card.Header>{user?.username}</Card.Header>
    //     <Card.Meta>{moment(user?.createdAt).fromNow(false)}</Card.Meta>
    //     <Card.Description>
    //       <Card.Group centered items={items} />
    //     </Card.Description>
    //   </CardContent>
    // </Card>
    <Container className="segment">
      <Grid padded stretched>
        <Grid.Column width={8}>
          <Grid.Row>
            <Container centered>
              <Header>Username</Header>
              <Card.Description>a few seconds ago</Card.Description>
            </Container>
            {/* <Header floated="left">{user?.username}</Header>
            <Header floated="left" className="meta">
            Woah
          </Header> */}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row>
            <Container centered>
              <Header>Username</Header>
              <Card.Description>a few seconds ago</Card.Description>
            </Container>
            {/* <Header floated="left">{user?.username}</Header>
            <Header floated="left" className="meta">
            Woah
          </Header> */}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Container>
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
    <Grid stretched centered padded>
      <Grid.Column>
        <Grid.Row>
          <Grid.Column>
            <Container textAlign="center">{ProfileCard}</Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>{ItemsDisplay}</Grid.Row>
      </Grid.Column>
    </Grid>
  );
  return user ? home : redirect;
};

export { Home };
