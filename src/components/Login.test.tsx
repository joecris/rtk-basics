import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  it("renders Login component correctly", () => {
    render(<Login />);

    expect(screen.getByRole("img", { name: "vite logo" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Login to the app" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
  });
});
