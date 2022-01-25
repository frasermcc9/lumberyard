import { GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../hooks/useAuth";
import { CornerAlertManager } from "../pages/components/common/CornerAlert";
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
      <CornerAlertManager>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CornerAlertManager>
    </AuthContextProvider>
  );
};

export default App;
