import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Form from "./component/Form";
import TodoList from "./component/TodoList";

export default function Home() {
  return (
    <div className="px-[45%] pt-[100px] ">
      <Form />
      <TodoList />
    </div>
  );
}
