import { getAuth } from "@firebase/auth";
import React from "react";
import { isError } from "util";
import { useAuth } from "../../../hooks/useAuth";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const logout = () => {
    getAuth().signOut();
  };

  const [{ user }] = useAuth();

  return (
    <div className="bg-neutral-800 p-4 w-full shadow-lg">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <img
            src={user?.photoURL ?? ""}
            referrerPolicy="no-referrer"
            alt="Google avatar"
            className="rounded-full w-12 shadow-lg"
          />
          <div className="flex flex-col">
            <div className="font-bold text-lg">{user?.displayName}</div>
            <div className="text-neutral-400 text-base">{user?.email}</div>
          </div>
        </div>
        <button className="w-24" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navigation;
