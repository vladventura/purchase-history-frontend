import { EditButton } from "../components/EditButton";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { item } from "./mocks/itemMocks";

describe("Edit Button tests", () => {
  let button: RenderResult;

  beforeEach(() => {
    button = render(
      <MockedProvider>
        <EditButton item={item} />
      </MockedProvider>
    );
  });
  it("Should render the button", () => {
    expect(button.getByTestId("edit-button")).toBeTruthy();
  });
  it("Button's onClick gets called when passed in", () => {
    const onClick = jest.fn();
    button.rerender(
      <MockedProvider>
        <EditButton item={item} onClick={onClick} />
      </MockedProvider>
    );
    fireEvent.click(button.getByTestId("edit-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("Should open modal with internal onClick", () => {
    fireEvent.click(button.getByTestId("edit-button"));
    const modal = screen.getByTestId("edit-button-modal");
    expect(modal).toBeTruthy();
  });
});
