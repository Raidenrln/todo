  import { useState } from "react";
  import TodoList from "../components/todo/TodoList";
  import { useTodos, type TodoStatus } from "../context/TodoContext";

  const TodoPage = () => {
    const { handleAdd } = useTodos();
    const handleAddTodo = () => {
      const newTodo = {
        id: crypto.randomUUID(),
        name: "",
        createdAt: new Date().toISOString().split("T")[0],
        deadline: "",
        description: "",
        status: "In Progress" as TodoStatus,
        isEditable: true,
      };
      handleAdd(newTodo);
    };
    return (
      <div className="flex fixed w-screen h-screen inset-0 justify-center bg-black/85">
        <div className="flex flex-col w-full max-w-md bg-white h-screen ">
          <div className="flex w-full h-auto justify-between items-center p-4 border-b border-stone-400 shadow-[0_4px_8px_-4px_rgba(0,0,0,0.25)]">
            <span className="text-2xl font-extrabold">ToDo</span>
            <button onClick={() => handleAddTodo()} className="text-white bg-black py-1.5 px-2 rounded-md">
              + Add ToDo
            </button>
          </div>
          <div className="bg-white overflow-y-scroll scrollbar-none px-2 py-2">
            <TodoList />
          </div>
        </div>
      </div>
    );
  };

  export default TodoPage;
