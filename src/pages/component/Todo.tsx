import React from "react";
import { api } from "~/utils/api";

interface TodoProps {
  id: string;
  todo: string;
  complete: boolean;
}

const Todo = ({ id, todo, complete }: TodoProps) => {
  const ctx = api.useContext();
  const className = complete ? "line-through" : "";
  const updateTodo = api.todo.toggleComplete.useMutation({
    onSuccess: () => {
      void ctx.todo.getUserTodos.invalidate();
    },
  });
  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      void ctx.todo.getUserTodos.invalidate();
    },
  });
  function handleClick() {
    updateTodo.mutate({ id, complete });
  }

  return (
    <li className="flex gap-4 py-2 pl-1">
      <span onClick={handleClick} className={`${className}`}>
        <input className="mr-3" type="checkbox" checked={complete} />
        {todo}
      </span>
      <button
        onClick={() => deleteTodo.mutate({ id })}
        className="btn btn-outline btn-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
};

export default Todo;
