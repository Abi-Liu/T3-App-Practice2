import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Form from "./component/Form";
import TodoList from "./component/TodoList";
import Welcome from "./component/Welcome";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Welcome />
      <Form />
      <TodoList />
    </div>
  );
}
