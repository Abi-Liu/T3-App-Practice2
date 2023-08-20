import React from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Todo from "./Todo";

const TodoList = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading, isError } = api.todo.getUserTodos.useQuery(
    undefined,
    {
      enabled: sessionData?.user.id !== undefined,
    }
  );
  console.log(data);
  return (
    <div>
      <ul>
        {data?.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            complete={todo.complete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
