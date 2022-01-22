import { GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../hooks/useAuth";
import Router from "./Router";

const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
