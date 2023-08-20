import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const [input, setInput] = useState("");
  const { data: sessionData } = useSession();
  const ctx = api.useContext();

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      setInput("");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo.mutate({ todo: input });
  }

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <form onSubmit={() => handleSubmit} className="flex flex-row gap-3">
        <input
          className="outline"
          placeholder="Add Todo"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
