import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Element }) => {
  const token = useSelector((state) => state.auth.isToken);
  return token ? <Navigate to="/" /> : <Element />;
};

export default PublicRoute;
