import moment from "moment";
import { Button, Card, Container, Grid, Header } from "semantic-ui-react";
import { User } from "../../graphql/schemas";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {

  return (
    <Grid padded stretched className="segment profile-banner">
      <Grid.Row
        className="profile-banner-row"
        divided
        stretched
        verticalAlign="middle"
      >
        <Grid.Column width={8} textAlign="center">
          <Container>
            <Header>{user?.username}</Header>
            <Card.Description>
              {"Joined " + moment(user?.profile?.createdAt).fromNow(false)}
            </Card.Description>
          </Container>
          <Container>
            <Button>Add an item</Button>
          </Container>
        </Grid.Column>

        <Grid.Column width={8}>
          <Card
            header="Items added"
            description={user?.profile?.totalAddedItems}
          />
          <Card
            header="Price paid"
            description={user?.profile?.totalPrice}
          />
          <Card
            header="Current cost"
            description={user?.profile?.totalCost}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export { ProfileBanner };
