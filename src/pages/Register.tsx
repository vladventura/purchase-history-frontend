import { useState } from "react";
import { Button, Container, Form, Modal } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";
import { OnForm } from "../utils/hooks";
import { AuthFormType, FormErrorsType } from "../common/types";
import { ErrorsBlock } from "../components/ErrorsBlock";

const Register = (props: any) => {
  const initState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, onChange, onSubmit } = OnForm(registerUser, initState);

  // Remove this from here and redirect to a page with the user's
  // const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as FormErrorsType);
  const [showModal, setShowModal] = useState(false);

  const [register, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update: (_, result) => {
      setShowModal(true);
    },
    onError: (err) => {
      if (err.graphQLErrors[0].extensions?.code === "BAD_USER_INPUT") {
        const errs = err.graphQLErrors[0].extensions?.exception.errors;
        setErrors(errs);
      }
    },
    variables: values,
  });

  function registerUser() {
    register();
  }

  return (
    <Container
      className="middle aligned center aligned grid"
      data-testid="register-page"
    >
      <div className="column">
        <h2 className="ui header">
          <div className="content">Register a new account</div>
        </h2>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={"ui large form " + (loading ? "loading" : "")}
          data-testid="register-form"
        >
          <div className="ui stacked segment">
            <Form.Input
              placeholder="Username"
              name="username"
              onChange={onChange}
              value={(values as AuthFormType).username}
              error={errors.username ? true : false}
              iconPosition="left"
              icon={<i className="user icon" />}
              data-testid="register-form-username"
            />
            <Form.Input
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={(values as AuthFormType).email}
              error={errors.email ? true : false}
              iconPosition="left"
              icon={<i className="mail icon" />}
              data-testid="register-form-email"
            />
            <Form.Input
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={(values as AuthFormType).password}
              error={errors.password ? true : false}
              type="password"
              iconPosition="left"
              icon={<i className="lock icon" />}
              data-testid="register-form-password"
            />
            <Form.Input
              onChange={onChange}
              name="confirmPassword"
              value={(values as AuthFormType).confirmPassword}
              type="password"
              error={errors.confirmPassword ? true : false}
              placeholder="Confirm Password"
              iconPosition="left"
              icon={<i className="lock icon" />}
              data-testid="register-form-confirm-password"
            />
            <Modal
              open={showModal}
              closeOnEscape={true}
              closeIcon={true}
              onClose={() => setShowModal(false)}
              trigger={
                <Button
                  fluid
                  type="submit"
                  primary
                  className="button"
                  data-testid="register-form-register"
                >
                  Register
                </Button>
              }
            >
              <Modal.Header>Account Created!</Modal.Header>
              <Modal.Content>
                Please check your email to verify your account!
              </Modal.Content>
            </Modal>
          </div>
        </Form>
        <ErrorsBlock errors={errors} />
        <div className="ui message">
          Have an account already? <a href="/login"> Sign in!</a>
        </div>
      </div>
    </Container>
  );
};

export { Register };
