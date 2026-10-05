import { render, screen, within } from "@testing-library/react";
import App from "./App";

// Option A: mock Login
vi.mock(import("./components/Login"), () => ({
  default: () => <p>Login stub</p>,
}));

test("renders Login inside the main landmark", () => {
  render(<App />);

  expect(
    within(screen.getByRole("main")).getByText("Login stub"),
  ).toBeInTheDocument();
});

/**
 * Option B: real Login, but query by structure, not text
 * 
const main = screen.getByRole("main");
expect(within(main).getByRole("heading", { level: 1 })).toBeInTheDocument();
 */

/**
 * Which to pick
 * These are two known testing styles. "Solitary" unit tests mock collaborators and isolate one component. "Sociable" unit tests render real children and accept that one break can fail several tests in exchange for checking integration. Teams pick one per layer:
 * Pure composition components like App and Dashboard, where the children are tested on their own: Option A is clean and justified. The component's whole job is "put X here," and the mock checks exactly that.
 * Components with their own logic that depends on a child's behavior, such as reacting to a child's callback or passing it state: render the real child. Mocking it would hide the very interaction you need to test.
 */
