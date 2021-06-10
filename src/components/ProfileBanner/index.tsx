import moment from "moment";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Dropdown,
  DropdownProps,
  Grid,
  Header,
  Message,
  Modal,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import { ItemsContext } from "../../context/items";
import { UIContext } from "../../context/ui";
import { User } from "../../graphql/schemas";
import { SortTypes } from "../../utils/sorter";
import { ItemForm } from "../ItemForm";
import "./index.css";

type ProfileBannerProps = {
  user?: User | null;
};

const dropdownOptions = [
  {
    key: 1,
    text: "Name ⬆️",
    value: SortTypes.NameAsc,
    "data-testid": "profile-banner-dropdown-item",
  },
  {
    key: 2,
    text: "Name ⬇️",
    value: SortTypes.NameDesc,
    "data-testid": "profile-banner-dropdown-item",
  },
  {
    key: 3,
    text: "Price ⬆️",
    value: SortTypes.PriceAsc,
    "data-testid": "profile-banner-dropdown-item",
  },
  {
    key: 4,
    text: "Price ⬇️",
    value: SortTypes.PriceDesc,
    "data-testid": "profile-banner-dropdown-item",
  },
  {
    key: 5,
    text: "Cost ⬆️",
    value: SortTypes.CostAsc,
    "data-testid": "profile-banner-dropdown-item",
  },
  {
    key: 6,
    text: "Cost ⬇️",
    value: SortTypes.CostDesc,
    "data-testid": "profile-banner-dropdown-item",
  },
];

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useContext(AuthContext);
  const { showMessage, message } = useContext(UIContext);
  const { setItems } = useContext(ItemsContext);
  const currency = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  });

  function onModalClose() {
    setOpenModal(false);
  }

  const onDropdownChange = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    setItems(undefined, value as SortTypes);
  };

  return (
    <Grid
      padded
      stretched
      className="segment profile-banner"
      data-testid="profile-banner"
    >
      <Grid.Row
        className="profile-banner-row"
        divided
        stretched
        verticalAlign="middle"
      >
        <Grid.Column
          width={6}
          textAlign="center"
          data-testid="profile-banner-user-column"
        >
          <Container>
            <Header data-testid="profile-banner-username">
              {user?.username}
            </Header>
            <Card.Description data-testid="profile-banner-joined">
              {"Joined " + moment(user?.profile?.createdAt).fromNow(false)}
            </Card.Description>
          </Container>
          <Container>
            <Modal
              onClose={onModalClose}
              onOpen={() => setOpenModal(true)}
              open={openModal}
              trigger={
                <Button data-testid="profile-banner-add" primary>
                  Add an item
                </Button>
              }
            >
              <Modal.Header>Add an item</Modal.Header>
              <Modal.Content>
                <ItemForm onFormSubmit={onModalClose} />
              </Modal.Content>
            </Modal>
          </Container>
        </Grid.Column>

        <Grid.Column width={6} data-testid="profile-banner-data-column">
          <Grid.Row>
            <Grid.Column>
              <Card
                data-testid="profile-banner-total-items"
                header="Items added"
                description={user?.profile?.totalAddedItems || 0}
              />
              <Card
                data-testid="profile-banner-total-price"
                header="Price paid"
                description={currency.format(user?.profile?.totalPrice || 0)}
              />
              <Card
                data-testid="profile-banner-total-cost"
                header="Current cost"
                description={currency.format(user?.profile?.totalCost || 0)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4} data-testid="profile-banner-logout-column">
          <Container>
            <Button
              data-testid="profile-banner-logout"
              onClick={logout}
              floated="right"
              basic
              color="red"
            >
              Log out
            </Button>
          </Container>
          <Container>
            <Dropdown
              clearable
              placeholder="Sort by"
              options={dropdownOptions}
              selection
              onChange={onDropdownChange}
              data-testid="profile-banner-dropdown"
            />
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

export { ProfileBanner, dropdownOptions };
