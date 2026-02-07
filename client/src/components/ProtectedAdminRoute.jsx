// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("adminToken"); // ✅ use sessionStorage
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;
