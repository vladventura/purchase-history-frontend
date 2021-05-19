import { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";
import { OnForm } from "../utils/hooks";
import { UserRegisterMutation } from "../graphql/mutations";

const Login = (props: any) => {
  const initState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, onChange, onSubmit } = OnForm(registerUser, initState);

  type ErrorsInitState = {
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as ErrorsInitState);

  const [register, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update: (_, result) => {
      context.login(result as UserRegisterMutation);
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
          <div className="content">Register a new account</div>
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
              value={values.username}
              error={errors.username ? true : false}
              iconPosition="left"
              icon={<i className="user icon" />}
            />
            <Form.Input
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={values.email}
              error={errors.email ? true : false}
              iconPosition="left"
              icon={<i className="mail icon" />}
            />
            <Form.Input
              placeholder="Password"
              name="password"
              onChange={onChange}
              value={values.password}
              error={errors.password ? true : false}
              type="password"
              iconPosition="left"
              icon={<i className="lock icon" />}
            />
            <Form.Input
              onChange={onChange}
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              error={errors.confirmPassword ? true : false}
              placeholder="Confirm Password"
              iconPosition="left"
              icon={<i className="lock icon" />}
            />
            <Button fluid type="submit" primary className="button">
              Register
            </Button>
          </div>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((error: any) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="ui message">
          Have an account already? <a href="/login"> Sign in!</a>
        </div>
      </div>
    </Container>
  );
};

export { Login };
