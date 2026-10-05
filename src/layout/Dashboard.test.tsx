// import { render, screen } from "@testing-library/react";
// import Dashboard from "./Dashboard";

// vi.mock(import("../components/Header"), () => ({
//   default: vi.fn(() => <div>Header component</div>),
// }));

// describe("Dashboard layout", () => {
//   it("tests Dashboard layout correctly renders children component and layout", () => {
//     render(<Dashboard />);

//     expect(screen.getByText("Header component")).toBeInTheDocument();
//   });
// });

import { Route, Routes } from "react-router";
import { renderWithProviders, screen } from "../test-utils";
import Dashboard from "./Dashboard";

function renderDashboardAt(url: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<p>Index page</p>} />
        <Route path="child" element={<p>Child page</p>} />
      </Route>
    </Routes>,
    { initialEntries: [url] },
  );
}

describe("Dashboard layout", () => {
  test("renders the Header", () => {
    renderDashboardAt("/");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("renders the matched child route in the Outlet", () => {
    renderDashboardAt("/child");
    expect(screen.getByText("Child page")).toBeInTheDocument();
    expect(screen.queryByText("Index page")).not.toBeInTheDocument();
  });
});
