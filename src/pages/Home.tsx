import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Item } from "../graphql/schemas";
import { ProfileBanner } from "../components/ProfileBanner";
import { ItemsDisplay } from "../components/ItemsDisplay";
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

  const home = (
    <Container fluid>
      <ProfileBanner user={user} />
      <ItemsDisplay items={items} loading={false} />
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
