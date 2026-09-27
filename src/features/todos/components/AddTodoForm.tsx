import { useAppDispatch } from "../../../hooks/hooks";
import { addTodos } from "../todosSlice";
import styled from "styled-components";

interface AddTodoFormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLTextAreaElement;
}
interface AddTodoFormElements extends HTMLFormElement {
  readonly elements: AddTodoFormFields;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }
`;

export default function AddTodoForm() {
  // const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  function handleAddTodo(e: React.SubmitEvent<AddTodoFormElements>) {
    // Prevent server submission
    e.preventDefault();
    const { elements } = e.currentTarget;

    // const payload = {
    //   name: elements.name.value,
    //   description: elements.description.value,
    // };
    const name = elements.name.value;
    const description = elements.description.value;
    dispatch(addTodos(name, description));
  }

  return (
    <>
      <div>Add Todo Form</div>
      <StyledForm onSubmit={handleAddTodo}>
        <div>
          <label htmlFor="description">Name</label>
          <input type="text" id="name" name="name" defaultValue="" required />
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            defaultValue=""
            required
          />
        </div>
        <button type="submit">Add ToDo</button>
      </StyledForm>
    </>
  );
}
