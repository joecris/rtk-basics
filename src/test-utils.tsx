/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { setupStore, type AppStore, type RootState } from "./store/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  /** Seed state for a fresh store. Ignored if `store` is passed. */
  preloadedState?: Partial<RootState>;
  /** Pass your own store, e.g. to dispatch before/after render. */
  store?: AppStore;
  /** URL history the router starts with; the last entry is the current URL. */
  initialEntries?: string[];
  /**
   * Route pattern to mount `ui` under, so `useParams()` works,
   * e.g. `{ path: "/todos/:id", initialEntries: ["/todos/42"] }`.
   */
  path?: string;
}

/**
 * Renders `ui` inside the same providers the app uses (Redux + Router),
 * with an in-memory router and a fresh store per call.
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    initialEntries = ["/"],
    path,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          {path ? (
            <Routes>
              <Route path={path} element={children} />
            </Routes>
          ) : (
            children
          )}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export RTL so tests can import everything from one place.
export * from "@testing-library/react";
