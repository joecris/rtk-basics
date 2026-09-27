export interface Todos {
  id: string;
  name: string;
  description: string;
  status: "todo" | "done";
  deadline?: string;
}

export type TodosFilter = "all" | "todo" | "done";
