import { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { LOGIN_USER_MUTATION } from "../graphql/mutations";
import { OnForm } from "../utils/hooks";
import { UserMutation } from "../graphql/mutations";
import { AuthFormType, FormErrorsType } from "../common/types";
import { ErrorsBlock } from "../components/ErrorsBlock";

const Login = (props: any) => {
  const initState = {
    username: "",
    password: "",
  };

  const { values, onChange, onSubmit } = OnForm(registerUser, initState);

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as FormErrorsType);

  const [register, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update: (_, result) => {
      context.login(result as UserMutation);
      props.history.push("/");
    },
    onError: (err) => {
      const errs = err.graphQLErrors[0].extensions?.exception.errors;
      setErrors(errs);
    },
    variables: values,
  });

  function registerUser() {
    register();
  }

  return (
    <Container className="middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui header">
          <div className="content">Log into your account</div>
        </h2>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={"ui large form " + (loading ? "loading" : "")}
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
            />
            <Button fluid type="submit" primary className="button">
              Log in
            </Button>
          </div>
        </Form>
        <ErrorsBlock errors={errors} />
        <div className="ui message">
          Don't have an account yet? <a href="/register"> Make a new one!</a>
        </div>
      </div>
    </Container>
  );
};

export { Login };
