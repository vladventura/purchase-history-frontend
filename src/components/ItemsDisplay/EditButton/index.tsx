import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Item } from "../../../graphql/schemas";
import { ItemForm } from "../../ItemForm";

type EditButtonProps = {
  item: Item;
};

export const EditButton = ({ item }: EditButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = () => setModalOpen(false);
  const onModalOpen = () => setModalOpen(true);

  return (
    <Modal
      onOpen={onModalOpen}
      onClose={onModalClose}
      open={modalOpen}
      data-testid="edit-button-modal"
      trigger={
        <Button basic color="blue" data-testid="edit-button">
          Edit
        </Button>
      }
    >
      <Modal.Header>Edit an item</Modal.Header>
      <Modal.Content>
        <ItemForm item={item} onFormSubmit={onModalClose} />
      </Modal.Content>
    </Modal>
  );
};
