import { renderWithProviders, screen } from "../test-utils";
import Header from "./Header";

describe("Header component", () => {
  test("renders the navigation links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Todos" })).toHaveAttribute(
      "href",
      "/todos",
    );
    expect(screen.getByRole("link", { name: "Cases" })).toHaveAttribute(
      "href",
      "/cases",
    );
  });

  test("marks the link for the current route as active", () => {
    renderWithProviders(<Header />, { initialEntries: ["/todos"] });

    expect(screen.getByRole("link", { name: "Todos" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
