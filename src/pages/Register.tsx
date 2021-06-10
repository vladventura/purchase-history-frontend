import { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";
import { OnForm } from "../utils/hooks";
import { UserMutation } from "../graphql/mutations";
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

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as FormErrorsType);

  const [register, { loading }] = useMutation(REGISTER_USER_MUTATION, {
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
            <Button
              fluid
              type="submit"
              primary
              className="button"
              data-testid="register-form-register"
            >
              Register
            </Button>
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
