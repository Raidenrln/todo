// components/AuthRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/todo" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;