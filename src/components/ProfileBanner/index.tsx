import { useMutation } from "@apollo/client";
import moment from "moment";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Modal,
} from "semantic-ui-react";
import { ADD_ITEM_MUTATION } from "../../graphql/mutations";
import { User } from "../../graphql/schemas";
import { OnForm } from "../../utils/hooks";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { values, onChange, onSubmit } = OnForm();

  const [addItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    update: (_, result) => {
      // TODO: Close modal
      // TODO: Show Item Saved successfully
      // TODO: Use the proxy to add the received item to the cached query
    },
  });

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
            <Modal
              onClose={() => setOpenModal(false)}
              onOpen={() => setOpenModal(true)}
              open={openModal}
              trigger={<Button>Add an item</Button>}
            >
              <Modal.Header>Add an item</Modal.Header>
              <Modal.Content>
                <Form></Form>
              </Modal.Content>
            </Modal>
          </Container>
        </Grid.Column>

        <Grid.Column width={8}>
          <Card
            header="Items added"
            description={user?.profile?.totalAddedItems}
          />
          <Card header="Price paid" description={user?.profile?.totalPrice} />
          <Card header="Current cost" description={user?.profile?.totalCost} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export { ProfileBanner };
