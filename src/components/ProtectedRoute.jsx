import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect them to the home page
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the component they are trying to access
  return children;
};

export default ProtectedRoute;
