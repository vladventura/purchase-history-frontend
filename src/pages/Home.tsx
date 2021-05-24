import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { ProfileBanner } from "../components/ProfileBanner";
import { ItemsDisplay } from "../components/ItemsDisplay";
import { useQuery } from "@apollo/client";
import { GetItemsQuery, GET_ITEMS_QUERY } from "../graphql/queries";
const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;
  const { data, loading } = useQuery(GET_ITEMS_QUERY);

  const home = (
    <Container fluid>
      <ProfileBanner user={user} />
      <ItemsDisplay
        items={(data as GetItemsQuery)?.getItems}
        loading={loading}
      />
    </Container>
  );
  return user ? home : redirect;
};

export { Home };
