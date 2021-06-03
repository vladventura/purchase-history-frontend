import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { ProfileBanner } from "../components/ProfileBanner";
import { ItemsDisplay } from "../components/ItemsDisplay";
import { useQuery } from "@apollo/client";
import { GetItemsQuery, GET_ITEMS_QUERY } from "../graphql/queries";
import { UIProvider } from "../context/ui";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;
  const { data, loading } = useQuery(GET_ITEMS_QUERY);

  const items = (data as GetItemsQuery)?.getItems;

  const home = (
    <Container fluid>
      <UIProvider>
        <ProfileBanner user={user} />
        <ItemsDisplay items={items} loading={loading} />
      </UIProvider>
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
