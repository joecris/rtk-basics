import { render, screen } from "@testing-library/react";
import Cases from "./Cases";

describe("Cases component", () => {
  test("renders the Cases component correctly", () => {
    render(<Cases />);

    expect(screen.getByText("Cases Page")).toBeInTheDocument();
  });
});
