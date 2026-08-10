import { createContext, useContext, useEffect, useState } from "react";

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
  handleAdd: () => void
}


export const TodoContext = createContext<TodoContextModel | null>(null)

export const TodoProvider = ({children}: {children: React.ReactNode}) => {
  const [todos, setTodo] = useState<TodoModel[]>(() => {
    const local = localStorage.getItem("todos")
    return local ? JSON.parse(local) : [];
  })

  const handleAdd = () => {
  const newTodo: TodoModel = {
    id: crypto.randomUUID(),
    name: "",
    status: "In Progress",
    createdAt: new Date().toISOString(),
    deadline: "",
    description: "",
    isEditable: true,
  };

  setTodo(prev => [...prev, newTodo]);
  };

  const handleEdit = (id: String, e: boolean) => {
    setTodo(prev => prev.map(t => t.id === id ?
       {...t, isEditable: e} 
       : t
    ));
  };

  const handleSave = (todo: TodoModel) => {
  setTodo(prev => {
    const updatedTodos = prev.map(t => t.id === todo.id ? todo : t);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    return updatedTodos;
  });
};
  

  return(
  <TodoContext.Provider value={{todos, handleEdit, handleSave, handleAdd}}>
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