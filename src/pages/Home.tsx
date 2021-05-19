import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Container } from "semantic-ui-react";
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
    <Container fluid className="segment grid">
      {console.log(user)}
      <Card fluid centered raised>
        <CardContent>
          <Card.Header>{user?.username}</Card.Header>
          <Card.Meta>
            {moment(user?.createdAt).fromNow(false)}
          </Card.Meta>
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
