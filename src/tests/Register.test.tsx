import { render, RenderResult } from "@testing-library/react";
import { Register } from "../pages/Register";
import { MockedProvider } from "@apollo/client/testing";

describe("Register page", () => {
  let register: RenderResult;
  beforeEach(() => {
    register = render(
      <MockedProvider>
        <Register />
      </MockedProvider>
    );
  });
  it("Should mount the page", () => {
    expect(register.queryByTestId("register-page")).toBeTruthy();
  });
  it("Should show the login form", () => {
    const form = register.queryByTestId("register-form");
    expect(form).toBeTruthy();
  });
  it("Should have a username field", () => {
    const username = register.queryByTestId("register-form-username");
    expect(username).toBeTruthy();
  });
  it("Should have a password field", () => {
    const password = register.queryByTestId("register-form-password");
    expect(password).toBeTruthy();
  });
  it("Should have a login button", () => {
    const registerButton = register.queryByTestId("register-form-register");
    expect(registerButton).toBeTruthy();
  });
});
