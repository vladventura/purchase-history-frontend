import { ErrorsBlock } from "../components/ErrorsBlock";
import { render } from "@testing-library/react";
import { errors } from "./mocks/errorsMock";

describe("ErrorsBlock tests", () => {
  it("Should mount and show the errors block", () => {
    const block = render(<ErrorsBlock errors={errors} />);
    expect(block.getByTestId("errors-block")).toBeTruthy();
  });
  it("Should show the correct amount of errors", () => {
    const block = render(<ErrorsBlock errors={errors} />);
    const errs = Object.keys(errors).length;
    expect(block.getAllByTestId("errors-block-error").length).toBe(errs);
  });
  it("Should not show the block when an empty errors object is passed", () => {
    const block = render(<ErrorsBlock errors={{}} />);
    expect(block.queryByTestId("errors-block")).toBeFalsy();
  });
});
