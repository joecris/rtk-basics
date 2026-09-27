import { Routes, Route } from "react-router";
import Dashboard from "../layout/Dashboard";
import Cases from "../components/Cases";
import Login from "../components/Login";
import TodosList from "../features/todos/components/TodosList";
import AddTodoForm from "../features/todos/components/AddTodoForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Login />} />
        <Route path="cases" element={<Cases />} />
        <Route path="todos">
          <Route index element={<TodosList />} />
          <Route path="add" element={<AddTodoForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
