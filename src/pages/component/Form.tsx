import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";

const Form = () => {
  const [input, setInput] = useState("");
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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row gap-1 pb-5">
        <input
          className="rounded-lg border border-black px-3"
          placeholder="Add Todo"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="rounded-xl bg-sky-500 px-5 hover:bg-sky-700"
          type="submit"
        >
          Add
        </button>
      </form>
      {createTodo.isError && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Todo must contain at least 1 character</span>
        </div>
      )}
    </div>
  );
};

export default Form;
