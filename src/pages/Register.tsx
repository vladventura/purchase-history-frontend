import React, { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { User } from "../graphql/schemas";
import { REGISTER_USER_MUTATION } from "../graphql/mutations";

const Register = (props: any) => {
  const initState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  type ErrorsInitState = {
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
  const context = useContext(AuthContext);
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({} as ErrorsInitState);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser();
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [register, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update: (proxy, result) => {
      console.log(result);
      context.login(result as User);
      props.history.push("/");
    },
    onError: (err) => {
      console.log(err);
      const errs = err.graphQLErrors[0].extensions?.exception.errors;
      console.log(errs);
      setErrors(errs);
    },
    variables: values,
  });

  function registerUser() {
    register();
  }

  return (
    <Container className="form-container">
      <Form
        onSubmit={handleOnSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Register Page</h1>
        <Form.Input
          label="Username"
          name="username"
          onChange={handleOnChange}
          value={values.username}
          error={errors.username ? true : false}
        />

        <Form.Input
          label="Email"
          name="email"
          onChange={handleOnChange}
          value={values.email}
          error={errors.email ? true : false}
        />
        <Form.Input
          label="Password"
          name="password"
          onChange={handleOnChange}
          value={values.password}
          error={errors.password ? true : false}
          type="password"
        />
        <Form.Input
          label="Confirm Password"
          onChange={handleOnChange}
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>
          Register
        </Button>
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
    </Container>
  );
};

export { Register };
