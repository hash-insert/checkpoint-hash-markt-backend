import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ ...rest }) => {
  const { loggedIn } = useAuth();
  console.log(loggedIn)
  if (loggedIn) {
    return <Routes><Route {...rest} /></Routes>;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
