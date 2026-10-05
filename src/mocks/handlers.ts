import { http, HttpResponse } from "msw";
import type { Todos } from "../features/todos/types/todos";

// Fixed, predictable data for tests (unlike the faker-generated data the
// browser mock server in src/api/server.ts serves to the running app).
export const todosFixture: Todos[] = [
  { id: "1", name: "Buy milk", description: "2 litres", status: "todo" },
  { id: "2", name: "Write tests", description: "For TodosList", status: "done" },
];

// Default "happy path" handlers shared by every test. Individual tests
// override them with `server.use(...)` for loading/error/empty scenarios.
export const handlers = [
  http.get("/fakeApi/todos", () => HttpResponse.json(todosFixture)),
];
