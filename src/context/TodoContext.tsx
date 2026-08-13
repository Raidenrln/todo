import { createContext, useContext, useEffect, useState } from "react";
import todoAPI from "../service/api";
import { useNavigate } from "react-router-dom";
export type TodoStatus = "Missed" | "In Progress" | "Done";

export type TodoModel = {
  id: string;
  name: string;
  status: TodoStatus;
  created_at: string;
  deadline: string;
  description: string;
  isEditable: boolean;
};

interface TodoContextModel {
  todos: TodoModel[];
  handleSave: (todo: TodoModel) => Promise<void>;
  handleAdd: (todo: TodoModel) => Promise<void>;
  handleOnchange: (todo: TodoModel, value: string) => void;
  handleEdit: (todo: TodoModel) => void;
  handleOnchangeDate: (todo: TodoModel, value: string) => void;
  handleLogout: () => void;
  fetchTodos: () => Promise<void>;
}

export const TodoContext = createContext<TodoContextModel | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodo] = useState<TodoModel[]>([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await todoAPI.get("/todo");
      setTodo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (todo: TodoModel) => {
    try {
      const response = await todoAPI.post("/todo/test", todo);

      console.log(response.data);

      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (todo: TodoModel) => {
    try {
      await todoAPI.put(`/todo/${todo.id}`, {
        ...todo,
        isEditable: false,
      });

      await fetchTodos();

    } catch (error) {
      console.error(error);
    }
  };

  const handleOnchange = (todo: TodoModel, value: string) => {
    setTodo((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              name: value,
            }
          : t,
      ),
    );
  };

  const handleOnchangeDate = (todo: TodoModel, value: string) => {
    setTodo((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              created_at: value,
            }
          : t,
      ),
    );
  };

  const handleEdit = (todo: TodoModel) => {
    setTodo((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              isEditable: true,
            }
          : t,
      ),
    );
  };
  
  const handleLogout = () => {
      localStorage.removeItem("token");
      setTodo([]);
      navigate("/");
    }
  return (
    <TodoContext.Provider
      value={{
        todos,
        handleSave,
        handleAdd,
        handleOnchange,
        handleEdit,
        handleOnchangeDate,
        handleLogout,
        fetchTodos
      }}
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
