import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Container, Dimmer, Loader, Modal } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { CONFIRM_ACCOUNT_MUTATION, UserMutation } from "../graphql/mutations";

const ConfirmAccount = () => {
  const search = useLocation().search;
  const history = useHistory();
  const u = new URLSearchParams(search).get("u");
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(false);
  const context = useContext(AuthContext);

  const [verifyUser, { loading }] = useMutation(CONFIRM_ACCOUNT_MUTATION, {
    update: (_, result) => {
      setValid(true);
      context.login(result as UserMutation);
      setTimeout(() => history.push("/"), 5000);
    },
    onError: (err) => {
      setError(true);
    },
    variables: {
      userId: search.replace("?u=", ""),
    },
  });
  useEffect(() => {
    if (!u) {
      history.push("/not-found");
    } else {
      verifyUser();
    }
  }, [u, history, verifyUser]);

  const errorModal = () => (
    <>
      <Container className="middle aligned center aligned grid">
        <div className="column">
          <Modal dimmer={false} open={!loading}>
            <Card.Header>Invalid token</Card.Header>
            <Modal.Content>
              The current token didn't work. Try to copy and paste the link into
              the browser page.
            </Modal.Content>
          </Modal>
        </div>
        <Dimmer active={loading}>
          <Loader inline>Verifying account</Loader>
        </Dimmer>
      </Container>
    </>
  );

  const modal = () => (
    <>
      {error ? (
        errorModal()
      ) : (
        <Container className="middle aligned center aligned grid">
          <div className="column">
            <Modal dimmer={false} open={!loading}>
              <Card.Header>Verifying account</Card.Header>
              {valid ? (
                <Modal.Content>
                  Your account has been verified! You'll be redirected to the
                  main page shortly!
                </Modal.Content>
              ) : (
                <></>
              )}
            </Modal>
          </div>
          <Dimmer active={loading}>
            <Loader inline>Verifying account</Loader>
          </Dimmer>
        </Container>
      )}
    </>
  );

  return modal();
};

export { ConfirmAccount };
