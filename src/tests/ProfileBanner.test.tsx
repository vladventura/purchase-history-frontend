import { render, RenderResult } from "@testing-library/react";
import moment from "moment";
import { ProfileBanner, dropdownOptions } from "../components/ProfileBanner";
import { user } from "./mocks/userMocks";

describe("Profile Banner tests", () => {
  let banner: RenderResult;
  const currency = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  });
  beforeEach(() => {
    banner = render(<ProfileBanner user={user} />);
  });
  it("Should render the banner", () => {
    expect(banner.getByTestId("profile-banner")).toBeTruthy();
  });

  it("Should show the username", () => {
    const usernameHeader = banner.getByTestId("profile-banner-username");
    expect(usernameHeader.textContent).toBe(user.username);
  });
  it("Should show since when the user joined", () => {
    const joinedParagraph = banner.getByTestId("profile-banner-joined");
    expect(joinedParagraph.textContent).toContain(
      moment(user.createdAt).fromNow(false)
    );
  });
  it("Should show how many items they have", () => {
    const totalItems = banner
      .getByTestId("profile-banner-total-items")
      .querySelector(".description");
    expect(totalItems?.textContent).toBe(
      user.profile?.totalAddedItems?.toString()
    );
  });
  it("Should show their total paid price", () => {
    const totalItems = banner
      .getByTestId("profile-banner-total-price")
      .querySelector(".description");
    expect(totalItems?.textContent).toContain(
      currency.format(user.profile?.totalPrice!)
    );
  });
  it("Should show the total cost of their items", () => {
    const totalItems = banner
      .getByTestId("profile-banner-total-cost")
      .querySelector(".description");
    expect(totalItems?.textContent).toContain(
      currency.format(user.profile?.totalCost!)
    );
  });
  it("Should show a dropdown", () => {
    const dropdown = banner.getByTestId("profile-banner-dropdown");
    expect(dropdown).toBeTruthy();
  });
  it("Should have all options from the dropdown", () => {
    const dropdownItems = banner.getAllByTestId("profile-banner-dropdown-item");
    expect(dropdownItems.length).toBe(dropdownOptions.length);
  });
  it("Should have a logout button", () => {
    const logoutButton = banner.getByTestId("profile-banner-logout");
    expect(logoutButton).toBeTruthy();
  });
});
