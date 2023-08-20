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
    <li className="flex gap-4 py-2">
      <span onClick={handleClick} className={`${className}`}>
        {todo}
      </span>
      <button onClick={() => deleteTodo.mutate({ id })}>delete</button>
    </li>
  );
};

export default Todo;
