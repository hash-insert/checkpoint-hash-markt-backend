import { useAuth } from "../Context/AuthContext";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ ...rest }) => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return (
      <Routes>
        <Route {...rest} />
      </Routes>
    );
  } else {
    return <Navigate to="/siginin" replce />;
  }
};

export default ProtectedRoute;
