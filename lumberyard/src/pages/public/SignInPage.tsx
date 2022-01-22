import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const uiConfig = {
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
};

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};

export default SignInPage;
