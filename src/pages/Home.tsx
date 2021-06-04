import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { ProfileBanner } from "../components/ProfileBanner";
import { ItemsDisplay } from "../components/ItemsDisplay";
import { useQuery } from "@apollo/client";
import { GetItemsQuery, GET_ITEMS_QUERY } from "../graphql/queries";
import { UIProvider } from "../context/ui";
import { ItemsContext } from "../context/items";
const Home = () => {
  const { user } = useContext(AuthContext);
  const { items, setItems } = useContext(ItemsContext);

  const { data, loading } = useQuery(GET_ITEMS_QUERY, {});

  useEffect(() => {
    setItems((data as GetItemsQuery)?.getItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(data as GetItemsQuery)?.getItems]);

  const redirect = <Redirect to="/login" />;
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
