import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/private/HomePage";
import ProjectPage from "../pages/private/ProjectPage";

interface AuthRoutesProps {}

const AuthRoutes: React.FC<AuthRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
