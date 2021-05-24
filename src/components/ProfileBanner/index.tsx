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
import { ItemErrorsType, ItemFormType } from "../../common/types";
import { ADD_ITEM_MUTATION } from "../../graphql/mutations";
import { User } from "../../graphql/schemas";
import { OnForm } from "../../utils/hooks";
import { ErrorsBlock } from "../ErrorsBlock";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { values, onChange, onSubmit } = OnForm(addAnItem, {
    name: "",
    price: 0.0,
    cost: 0.0,
  } as ItemFormType);
  const [errors, setErrors] = useState({} as ItemErrorsType);

  const [addItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    update: (_, result) => {
      console.log(result);
      // TODO: Close modal
      // TODO: Show Item Saved successfully
      // TODO: Use the proxy to add the received item to the cached query
    },
    variables: values,
    onError: (error) => {
      const errs = error.graphQLErrors[0].extensions?.exception.errors;
      console.log(errs);
      setErrors(errs);
    },
  });

  function addAnItem() {
    addItem();
  }

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
              // TODO: Clear the inputs here. Maybe save init state and return something to clear it
              // from the hook
              onClose={() => setOpenModal(false)}
              onOpen={() => setOpenModal(true)}
              open={openModal}
              trigger={<Button>Add an item</Button>}
            >
              <Modal.Header>Add an item</Modal.Header>
              <Modal.Content>
                <Form
                  onSubmit={onSubmit}
                  noValidate
                  className={"ui large form " + (loading ? "loading" : "")}
                >
                  <div className="ui segment">
                    <Form.Input
                      placeholder="Item Name"
                      label="Item Name"
                      name="name"
                      onChange={onChange}
                      value={(values as ItemFormType).name}
                      error={errors.name ? true : false}
                      iconPosition="left"
                      // TODO: Get a better icon for this btw
                      icon={<i className="user icon" />}
                    />
                    <Form.Input
                      placeholder="What you paid for the item"
                      label="What you paid for the item"
                      name="price"
                      onChange={onChange}
                      value={(values as ItemFormType).price}
                      error={errors.price ? true : false}
                      // TODO: Get a numeric input type, I think this derived from html input
                      type="number"
                      iconPosition="left"
                      // TODO: Get a better icon for this btw
                      icon={<i className="lock icon" />}
                    />
                    <Form.Input
                      placeholder="What it currently costs"
                      label="What it currently costs"
                      name="cost"
                      onChange={onChange}
                      value={(values as ItemFormType).cost}
                      error={errors.cost ? true : false}
                      // TODO: Get a numeric input type, I think this derived from html input
                      type="number"
                      iconPosition="left"
                      // TODO: Get a better icon for this btw
                      icon={<i className="lock icon" />}
                    />
                    <Button fluid type="submit" primary className="button">
                      Save Item
                    </Button>
                  </div>
                </Form>
                <ErrorsBlock errors={errors} />
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
