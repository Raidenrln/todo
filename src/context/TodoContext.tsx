import { createContext, useContext, useState } from "react";

export type TodoStatus = "Missed" | "In Progress" | "Done";

export type TodoModel = {
   id: string; 
   name: string; 
   status: TodoStatus;
   createdAt: string
   deadline: string; 
   description: string; 
   isEditable: boolean
  };

interface TodoContextModel {
  todos: TodoModel[];
  handleEdit: (id: string, e: boolean) => void
  handleSave: (todo: TodoModel) => void
}


export const TodoContext = createContext<TodoContextModel | null>(null)

export const TodoProvider = ({children}: {children: React.ReactNode}) => {
  const [todos, setTodo] = useState<TodoModel[]>([
  {
    id: "rfdadw",
    name: "Upgrade billing dashboard",
    status: "Done",
    createdAt: "2026-05-01",
    deadline: "2026-05-08",
    description: "Migrate the billing UI to the new component library and add usage charts.",
    isEditable: false
  },
  {
    id: "sdad",
    name: "Fix onboarding checklist bug",
    status: "In Progress",
    createdAt: "2026-06-02",
    deadline: "2026-06-14",
    description: "Checklist items aren't persisting after refresh for new workspace members.",
    isEditable: false
  },
  {
    id: "3",
    name: "Write Q3 release notes",
    status: "Missed",
    createdAt: "2026-06-10",
    deadline: "2026-06-20",
    description: "Summarize shipped features from the last sprint for the changelog email.",
    isEditable: false
  },
]) || [];

  const handleEdit = (id: String, e: boolean) => {
    setTodo(prev => prev.map(t => t.id === id ?
       {...t, isEditable: e} 
       : t
      ))
  }
  const handleSave = (todo: TodoModel) => {
  setTodo(prev =>
    prev.map(t =>
      t.id === todo.id ? todo : t
    )
  );
};
  return(
  <TodoContext.Provider value={{todos, handleEdit, handleSave}}>
    {children}
  </TodoContext.Provider>)
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if(!context) {
    throw new Error("no child")
  }
  return context
}