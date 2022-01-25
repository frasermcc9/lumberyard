import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../hooks/useAuth";
import { CornerAlertManager } from "../pages/components/common/CornerAlert";
import Router from "./Router";

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
