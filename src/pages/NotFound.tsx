import { Card, Container, Modal } from "semantic-ui-react";

const NotFound = () => (
  <>
    <Container className="middle aligned center aligned grid">
      <div className="column">
        <Modal dimmer={false} open={true}>
          <Card.Header>Page not found</Card.Header>
        </Modal>
      </div>
    </Container>
  </>
);

export { NotFound };
