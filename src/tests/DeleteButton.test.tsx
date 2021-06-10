import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import { DeleteButton } from "../components/DeleteButton";
import { MockedProvider } from "@apollo/client/testing";
import { item } from "./mocks/itemMocks";

describe("DeleteButton tests", () => {
  let deleteButton: RenderResult;
  beforeEach(() => {
    deleteButton = render(
      <MockedProvider>
        <DeleteButton item={item} />
      </MockedProvider>
    );
  });
  it("Should render the button", () => {
    expect(deleteButton.getByTestId("delete-button")).toBeTruthy();
  });
  it("Button's onClick gets called when passed in", () => {
    const onClick = jest.fn();
    deleteButton.rerender(
      <MockedProvider>
        <DeleteButton item={item} onClick={onClick} />
      </MockedProvider>
    );
    fireEvent.click(deleteButton.getByTestId("delete-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("Should open a confirm modal", () => {
    fireEvent.click(deleteButton.getByTestId("delete-button"));
    const confirm = screen.getByTestId("delete-button-confirm");
    expect(confirm).toBeTruthy();
  });
});
