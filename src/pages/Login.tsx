import { useState, useContext } from "react";
import { Button, Container, Form, Modal } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { LOGIN_USER_MUTATION } from "../graphql/mutations";
import { OnForm } from "../utils/hooks";
import { UserMutation } from "../graphql/mutations";
import { AuthFormType, FormErrorsType } from "../common/types";
import { ErrorsBlock } from "../components/ErrorsBlock";
import { VerifyAccount } from "../components/VerifyAccount";

const Login = (props: any) => {
  const initState = {
    username: "",
    password: "",
  };

  const { values, onChange, onSubmit } = OnForm(loginUser, initState);

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as FormErrorsType);
  const [showModal, setShowModal] = useState(false);
  const [uid, setUid] = useState("");

  const [login, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update: (_, result) => {
      context.login(result as UserMutation);
      props.history.push("/");
    },
    onError: (err) => {
      if (err.graphQLErrors[0].extensions?.code === "BAD_USER_INPUT") {
        const errs = err.graphQLErrors[0].extensions?.exception.errors;
        setErrors(errs);
      } else {
        setShowModal(true);
        setUid(err.graphQLErrors[0].extensions?.exception.errors);
      }
    },
    variables: values,
  });

  function loginUser() {
    login();
  }

  return (
    <Container
      className="middle aligned center aligned grid"
      data-testid="login-page"
    >
      <div className="column">
        <h2 className="ui header">
          <div className="content">Log into your account</div>
        </h2>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={"ui large form " + (loading ? "loading" : "")}
          data-testid="login-form"
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
              data-testid="login-form-username"
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
              data-testid="login-form-password"
            />
            <Button
              fluid
              type="submit"
              primary
              className="button"
              data-testid="login-form-login"
            >
              Log in
            </Button>
          </div>
        </Form>
        <ErrorsBlock errors={errors} />
        <div className="ui message">
          Don't have an account yet? <a href="/register"> Make a new one!</a>
        </div>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <VerifyAccount uid={uid} />
      </Modal>
    </Container>
  );
};

export { Login };
