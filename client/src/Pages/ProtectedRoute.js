import { useAuth } from '../Context/AuthContext';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
