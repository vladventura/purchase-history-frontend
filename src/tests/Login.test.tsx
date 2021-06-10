import { render, RenderResult } from "@testing-library/react";
import { Login } from "../pages/Login";
import { MockedProvider } from "@apollo/client/testing";

describe("Login page", () => {
  let login: RenderResult;
  beforeEach(() => {
    login = render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
  });
  it("Should mount the page", () => {
    expect(login.queryByTestId("login-page")).toBeTruthy();
  });
  it("Should show the login form", () => {
    const form = login.queryByTestId("login-form");
    expect(form).toBeTruthy();
  });
  it("Should have a username field", () => {
    const username = login.queryByTestId("login-form-username");
    expect(username).toBeTruthy();
  });
  it("Should have a password field", () => {
    const password = login.queryByTestId("login-form-password");
    expect(password).toBeTruthy();
  });
  it("Should have a login button", () => {
    const loginButton = login.queryByTestId("login-form-login");
    expect(loginButton).toBeTruthy();
  });
});
