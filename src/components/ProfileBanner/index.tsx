import { useMutation } from "@apollo/client";
import moment from "moment";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Modal,
} from "semantic-ui-react";
import { ItemErrorsType, ItemFormType } from "../../common/types";
import { AuthContext } from "../../context/auth";
import { ADD_ITEM_MUTATION } from "../../graphql/mutations";
import { GetItemsQuery, GET_ITEMS_QUERY } from "../../graphql/queries";
import { Item, User } from "../../graphql/schemas";
import { OnForm } from "../../utils/hooks";
import { ErrorsBlock } from "../ErrorsBlock";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const initState: ItemFormType = {
    name: "",
    price: 0.0,
    cost: 0.0,
  };
  const [openModal, setOpenModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { values, onChange, onSubmit, clearValues } = OnForm(
    addAnItem,
    initState
  );
  const [errors, setErrors] = useState({} as ItemErrorsType);

  const { logout } = useContext(AuthContext);

  const [addItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    update: (proxy, result) => {
      onModalClose();
      onShowMessage();
      const data: GetItemsQuery | null = proxy.readQuery({
        query: GET_ITEMS_QUERY,
      });
      // TODO: Update the profile as well from here
      proxy.writeQuery({
        query: GET_ITEMS_QUERY,
        data: {
          ...data,
          getItems: [result.data?.addItem, ...(data?.getItems as [Item])],
        },
      });
    },
    variables: values,
    onError: (error) => {
      const errs = error.graphQLErrors[0].extensions?.exception.errors;
      setErrors(errs);
    },
  });

  function onShowMessage() {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  }

  function onModalClose() {
    setOpenModal(false);
    clearValues();
  }

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
                      icon={<i className="pencil alternate icon" />}
                    />
                    <Form.Input
                      placeholder="What you paid for the item"
                      label="What you paid for the item"
                      name="price"
                      onChange={onChange}
                      value={(values as ItemFormType).price}
                      error={errors.price ? true : false}
                      type="number"
                      iconPosition="left"
                      icon={<i className="dollar sign icon" />}
                    />
                    <Form.Input
                      placeholder="What it currently costs"
                      label="What it currently costs"
                      name="cost"
                      onChange={onChange}
                      value={(values as ItemFormType).cost}
                      error={errors.cost ? true : false}
                      type="number"
                      iconPosition="left"
                      icon={<i className="dollar sign icon" />}
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
            Item Added succesfully!
          </Message>
        </Grid.Row>
      )}
    </Grid>
  );
};

export { ProfileBanner };
