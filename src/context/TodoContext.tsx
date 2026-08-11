import { createContext, useContext, useState } from "react";

export type TodoStatus = "Missed" | "In Progress" | "Done";

export type TodoModel = {
  id: string;
  name: string;
  status: TodoStatus;
  createdAt: string;
  deadline: string;
  description: string;
  isEditable: boolean;
};

interface TodoContextModel {
  todos: TodoModel[];
  handleSave: (todo: TodoModel) => void;
  handleAdd: (todo: TodoModel) => void;
  handleOnchange: (todo: TodoModel, value: string) => void;
  handleEdit: (todo: TodoModel) => void;
  handleOnchangeDate: (todo: TodoModel, value: string) => void;
}

export const TodoContext = createContext<TodoContextModel | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodo] = useState<TodoModel[]>(() => {
    const local = localStorage.getItem("todos");
    return local ? JSON.parse(local) : [];
  });

  const handleAdd = (todo: TodoModel) => {
    setTodo((prev) => [...prev, todo]);
  };

  const handleSave = (todo: TodoModel) => {
    setTodo((prev) => {
      const updatedTodos = prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              isEditable: false,
            }
          : t,
      );
      const transferToLocal = updatedTodos.filter((t) => !t.isEditable);
      localStorage.setItem("todos", JSON.stringify(transferToLocal));

      return updatedTodos;
    });
  };
  const handleOnchange = (todo: TodoModel, value: string) => {
    setTodo((prev) => {
      const updatingName = prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              name: value,
            }
          : t,
      );
      return updatingName;
    });
  };
  const handleOnchangeDate = (todo: TodoModel, value: string) => {
    setTodo((prev) => prev.map((t) => (t.id === todo.id ? { ...t, createdAt: value } : t)));
  };
  const handleEdit = (todo: TodoModel) => {
    setTodo((prev) => {
      const updatingEdit = prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              isEditable: true,
            }
          : t,
      );
      return updatingEdit;
    });
  };

  return (
    <TodoContext.Provider
      value={{ todos, handleSave, handleAdd, handleOnchange, handleEdit, handleOnchangeDate }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("no child");
  }
  return context;
};
