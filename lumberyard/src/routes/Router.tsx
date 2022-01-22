import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import AuthenticatedRoutes from "./AuthRoutes";
import UnauthenticatedRoutes from "./NoAuthRoutes";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const [{ authLoaded, user }, setAuth] = useAuth();

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      setAuth({ authLoaded: true, user });
    });
    return () => {
      clearListener();
    };
  }, [setAuth]);

  console.log({ authLoaded, user });

  if (!authLoaded) {
    return null;
  }

  if (!user) {
    return <UnauthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
