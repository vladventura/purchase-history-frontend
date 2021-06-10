import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ItemForm } from "../components/ItemForm";

describe("ItemForm tests", () => {
  it("Should render the form", () => {
    const itemForm = render(
      <MockedProvider>
        <ItemForm />
      </MockedProvider>
    );
    expect(itemForm.getByTestId("item-form")).toBeTruthy();
  });
  it("Should have an add button", () => {
    const itemForm = render(
      <MockedProvider>
        <ItemForm />
      </MockedProvider>
    );
    expect(itemForm.queryByTestId("item-form-add")).toBeTruthy();
  });
  it("Should show update button", () => {
    const item = {
      id: 324,
      name: "Item Name",
      cost: 3.0,
      price: 20.0,
    };
    const itemForm = render(
      <MockedProvider>
        <ItemForm item={item} />
      </MockedProvider>
    );
    expect(itemForm.queryByTestId("item-form-update")).toBeTruthy();
  });
});
