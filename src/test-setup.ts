import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/node";

// Intercept network requests for every test. "error" makes a test fail
// loudly if a component calls an endpoint no handler covers, instead of
// silently hanging or hitting the real network.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Drop any per-test `server.use(...)` overrides so they can't leak.
afterEach(() => server.resetHandlers());

afterAll(() => server.close());

afterEach(() => {
  cleanup();

  // Global safety net for `vi.spyOn(...)`. A spy temporarily replaces a real
  // implementation (e.g. a module function or a method on a real object), and
  // that replacement persists until restored. Without this, a spy left
  // un-restored in one test file could leak into unrelated tests run in the
  // same worker/process. Plain `vi.fn()` mocks (e.g. ones created fresh per
  // test in a `beforeEach`) have nothing to restore, so this is a no-op for
  // those — it only matters once a test introduces `vi.spyOn`.
  vi.restoreAllMocks();
});
