import { Container, Header } from "semantic-ui-react";

const NotFound = () => (
  <>
    <Container className="middle aligned center aligned grid">
      <Container className="ui message column">
        <Header>Page not found</Header>
        <a href="/">Go back home</a>
      </Container>
    </Container>
  </>
);

export { NotFound };
