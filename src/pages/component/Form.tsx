import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";

const Form = () => {
  const [input, setInput] = useState("");
  const { data: sessionData } = useSession();
  const ctx = api.useContext();

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.todo.getUserTodos.invalidate();
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo.mutate({ todo: input });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3 pb-5">
      <input
        className="outline"
        placeholder="Add Todo"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
