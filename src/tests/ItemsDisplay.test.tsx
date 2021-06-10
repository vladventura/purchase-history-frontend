import { ItemsDisplay } from "../components/ItemsDisplay";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { items } from "./mocks/itemMocks";

describe("ItemsDisplay tests", () => {
  let component;

  it("Mounts the component (no items)", () => {
    component = render(
      <MockedProvider>
        <ItemsDisplay items={null} loading={false} />
      </MockedProvider>
    );
    expect(component.getByTestId("items-display")).toBeTruthy();
  });
  it("Mounts the loader when loading", () => {
    component = render(
      <MockedProvider>
        <ItemsDisplay items={null} loading={true} />
      </MockedProvider>
    );
    expect(component.getByTestId("loader")).toBeTruthy();
  });
  it("Shows the correct number of items", () => {
    component = render(
      <MockedProvider>
        <ItemsDisplay items={items} loading={false} />
      </MockedProvider>
    );
    expect(component.queryAllByTestId("items-display-item").length).toBe(
      items.length
    );
  });
  it("Renders edit buttons", () => {
    component = render(
      <MockedProvider>
        <ItemsDisplay items={items} loading={false} />
      </MockedProvider>
    );
    expect(component.queryAllByTestId("edit-button").length).toBe(items.length);
  });
  it("Renders delete buttons", () => {
    component = render(
      <MockedProvider>
        <ItemsDisplay items={items} loading={false} />
      </MockedProvider>
    );
    expect(component.queryAllByTestId("delete-button").length).toBe(
      items.length
    );
  });
});
