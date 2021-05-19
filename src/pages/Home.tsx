import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import "./Home.css";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;

  const ProfileCard = (
    <div className="ui segment grid profile-card">Profile Card</div>
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
