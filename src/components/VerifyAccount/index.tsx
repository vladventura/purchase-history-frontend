import { Button, Dimmer, Loader, Modal } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { RESEND_CONFIRMATION_EMAIL_MUTATION } from "../../graphql/mutations";
import { useState } from "react";

const VerifyAccount = ({ uid }: { uid: String }) => {
  const [resent, setResent] = useState(false);
  const [sendConfirmationEmail, { loading }] = useMutation(
    RESEND_CONFIRMATION_EMAIL_MUTATION,
    {
      variables: {
        userId: uid,
      },
    }
  );

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendConfirmationEmail();
    setResent(true);
  };

  const confirmationResent = () => (
    <>
      <Modal.Header>Your confirmation email has been resent!</Modal.Header>
      <Modal.Content>
        Please check your inbox's Junk mail folder just in case. If you cannot
        find it, give it 5 minutes or so, and try again. Thanks for using this
        app, you rock!
      </Modal.Content>
    </>
  );

  const resendConfirmation = () => (
    <>
      <Modal.Header>Account needs verification</Modal.Header>
      <Modal.Content>
        Please check your email account for a verification link we sent. If you
        need another one, please click the button below. If you need to change
        the email on your account, please contact me.
      </Modal.Content>
      <Modal.Content>
        <Button primary onClick={onClick}>
          Re-send email
        </Button>
      </Modal.Content>
      <Dimmer active={loading}>
        <Loader inline>Sending verification</Loader>
      </Dimmer>
    </>
  );

  return resent ? confirmationResent() : resendConfirmation();
};

export { VerifyAccount };
