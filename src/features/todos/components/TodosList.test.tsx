import { delay, http } from "msw";
import { server } from "../../../mocks/node";
import { renderWithProviders, screen, within } from "../../../test-utils";
import TodosList from "./TodosList";
import { todosFixture } from "../../../mocks/handlers";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  // Renders loading state
  it("shows a loading state while todos are being fetched", () => {
    // Keep the request pending forever so the component stays in "loading".
    server.use(
      http.get("/fakeApi/todos", async () => {
        await delay("infinite");
      }),
    );

    renderWithProviders(<TodosList />, { initialEntries: ["/todos"] });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Todos List")).not.toBeInTheDocument();
  });

  // Test labels
  it("test text labels", async () => {
    renderWithProviders(<TodosList />, { initialEntries: ["/todos"] });

    expect(await screen.findByText("Todos List")).toBeInTheDocument();
  });

  // Renders Todos
  it("shows the todo lists", async () => {
    renderWithProviders(<TodosList />, { initialEntries: ["/todos"] });

    // const idsAndNames = await Promise.all(
    //   todosFixture.map((item) =>
    //     screen.findByText(`${item.id} : ${item.name}`),
    //   ),
    // );

    // const descriptions = await Promise.all(
    //   todosFixture.map((item) => screen.findByText(item.description)),
    // );

    // idsAndNames.forEach((element) => {
    //   expect(element).toBeInTheDocument();
    // });

    // descriptions.forEach((element) => {
    //   expect(element).toBeInTheDocument();
    // });

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(todosFixture.length);

    items.forEach((item, i) => {
      const todo = todosFixture[i];
      expect(
        within(item).getByText(`${todo.id} : ${todo.name}`),
      ).toBeInTheDocument();
      expect(within(item).getByText(todo.description)).toBeInTheDocument();
    });
  });

  // Filters Todos
  it("tests filtering", async () => {
    const user = userEvent.setup();

    renderWithProviders(<TodosList />, { initialEntries: ["/todos"] });

    // test initial filter setting
    expect(await screen.findByText("Current Filter: all")).toBeInTheDocument();
    const selectElement = screen.getByRole("combobox", { name: "Set Filter" });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("all");
    expect(selectElement).toHaveDisplayValue("All");

    // filters Todo list by Todo
    await user.selectOptions(selectElement, "Todo");
    expect(selectElement).toHaveValue("todo");
    expect(selectElement).toHaveDisplayValue("Todo");
    const noOfTodoItems = todosFixture.filter(
      (item) => item.status === "todo",
    ).length;
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(noOfTodoItems);

    // filters Todo list by Done
    await user.selectOptions(selectElement, "Done");
    expect(selectElement).toHaveValue("done");
    expect(selectElement).toHaveDisplayValue("Done");
    const noOfDoneItems = todosFixture.filter(
      (item) => item.status === "done",
    ).length;
    const doneItems = screen.getAllByRole("listitem");
    expect(doneItems).toHaveLength(noOfDoneItems);
  });

  // check navigate to Todo button
  it("tests Todo Link", async () => {
    renderWithProviders(<TodosList />, { initialEntries: ["/todos"] });

    expect(
      await screen.findByRole("link", { name: "Add Todo" }),
    ).toHaveAttribute("href", "/add");
  });
});
