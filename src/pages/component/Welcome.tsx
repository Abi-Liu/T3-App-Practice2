import React from "react";
import { useSession } from "next-auth/react";

const Welcome = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="my-5">
      <h4 className="text-3xl font-bold">Welcome {sessionData?.user.name}</h4>
      <p className="text-lg">What do you want todo today?</p>
    </div>
  );
};

export default Welcome;
