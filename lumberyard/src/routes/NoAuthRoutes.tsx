import React from "react";
import { Routes, Route, Navigate } from "react-router";
import SignInPage from "../pages/public/SignInPage";

interface NoAuthRoutesProps {}

const NoAuthRoutes: React.FC<NoAuthRoutesProps> = () => {
  return (
    <Routes>
      <Route path="auth" element={<SignInPage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default NoAuthRoutes;
