import { getAuth } from "@firebase/auth";
import React from "react";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const logout = () => {
    getAuth().signOut();
  };
  return (
    <div className="bg-neutral-800 p-8 w-full shadow-lg">
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default Navigation;
