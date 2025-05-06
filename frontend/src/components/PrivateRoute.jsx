import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="p-4">Laadimine...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;