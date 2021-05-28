import moment from "moment";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Message,
  Modal,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import { User } from "../../graphql/schemas";
import { ItemForm } from "../ItemForm";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useContext(AuthContext);
  const { showMessage, message } = useContext(UIContext);

  function onModalClose() {
    setOpenModal(false);
  }

  return (
    <Grid padded stretched className="segment profile-banner">
      <Grid.Row
        className="profile-banner-row"
        divided
        stretched
        verticalAlign="middle"
      >
        <Grid.Column width={6} textAlign="center">
          <Container>
            <Header>{user?.username}</Header>
            <Card.Description>
              {"Joined " + moment(user?.profile?.createdAt).fromNow(false)}
            </Card.Description>
          </Container>
          <Container>
            <Modal
              onClose={onModalClose}
              onOpen={() => setOpenModal(true)}
              open={openModal}
              trigger={<Button primary>Add an item</Button>}
            >
              <Modal.Header>Add an item</Modal.Header>
              <Modal.Content>
                <ItemForm onFormSubmit={onModalClose} />
              </Modal.Content>
            </Modal>
          </Container>
        </Grid.Column>

        <Grid.Column width={6}>
          <Grid.Row>
            <Grid.Column>
              <Card
                header="Items added"
                description={user?.profile?.totalAddedItems}
              />
              <Card
                header="Price paid"
                description={"$" + user?.profile?.totalPrice}
              />
              <Card
                header="Current cost"
                description={"$" + user?.profile?.totalCost}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Container>
            <Button onClick={logout} floated="right" basic color="red">
              Log out
            </Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
      {showMessage && (
        <Grid.Row centered>
          <Message floating positive>
            {message}
          </Message>
        </Grid.Row>
      )}
    </Grid>
  );
};

export { ProfileBanner };
