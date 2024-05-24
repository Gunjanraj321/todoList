import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const token = useSelector((state) => state.auth.isToken);
  return token ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
