import Head from "next/head";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl normal-case">Todos</a>
        </div>
        <div className="flex-none gap-2">
          {sessionData ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <img
                    src={sessionData?.user?.image ?? undefined}
                    alt="profile image"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => void signOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button className="btn" onClick={() => void signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;