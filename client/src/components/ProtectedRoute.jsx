import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = checking, true = valid, false = invalid

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        sessionStorage.removeItem("adminToken");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (err) {
      console.error("❌ Invalid Token:", err);
      sessionStorage.removeItem("adminToken");
      setIsValid(false);
    }
  }, []); // ✅ Only once on mount

  // ⏳ Still checking
  if (isValid === null) {
    return (
      <div className="text-center mt-10 text-blue-500">Checking access...</div>
    );
  }

  // ❌ Not valid
  if (!isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Token valid — allow route
  return children;
};

export default ProtectedRoute;
