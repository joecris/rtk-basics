import { NavLink } from "react-router";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import {
  selectFilteredTodos,
  selectTodosFilter,
  setFilter,
  selectTodosStatus,
  fetchTodos,
} from "../todosSlice";
import type { TodosFilter } from "../types/todos";
import styled from "styled-components";
import { useEffect } from "react";

// Reset browser list styles so switching to <ul>/<li> keeps the same look.
const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledTodoItem = styled.li`
  border: 1px;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #cfcfcf;
  padding: 1rem 2.5rem;
  background-color: oklch(96.8% 0.007 247.896);
  margin: 1rem;
`;

export default function TodosList() {
  const todos = useAppSelector(selectFilteredTodos);
  const filter = useAppSelector(selectTodosFilter);
  const todosStatus = useAppSelector(selectTodosStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Note: in dev during strict mode, React runs useEffect twice
    if (todosStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setFilter(event.currentTarget.value as TodosFilter));
  }

  if (todosStatus === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Todos List</div>
      <div>Current Filter: {filter}</div>
      <div>
        <label htmlFor="filter">Set Filter</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          name="filter"
          id="filter"
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="done">Done</option>
        </select>
      </div>
      <StyledList>
        {todos.map((item) => (
          <StyledTodoItem key={item.id}>
            <p>
              {item.id} : {item.name}
            </p>
            <p>{item.description}</p>
          </StyledTodoItem>
        ))}
      </StyledList>
      <NavLink to="add" end>
        Add Todo
      </NavLink>
    </>
  );
}
