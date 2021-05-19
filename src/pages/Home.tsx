import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import "./Home.css";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;

  // Should parse this from the user incoming from the context
  const items = [
    {
      header: "Total items added",
      meta: "",
      description: "95 items added",
    },
  ];

  const ProfileCard = (
    <Container fluid className="segment grid">
      {console.log(user)}
      <Card fluid centered raised>
        <CardContent>
          <Card.Header>Username</Card.Header>
          <Card.Meta>Created ago</Card.Meta>
          <Card.Description>
            <Card.Group items={items} />
          </Card.Description>
        </CardContent>
      </Card>
    </Container>
  );

  const ItemsDisplay = (
    <div className="ui segment grid items-display">Items Display</div>
  );

  const home = (
    <Container className="middle grid column">
      <div className="ui container row">{ProfileCard}</div>
      <div className="ui container row">{ItemsDisplay}</div>
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
