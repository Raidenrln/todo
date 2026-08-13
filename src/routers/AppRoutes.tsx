import { Navigate, Route, Routes } from 'react-router-dom';
import TodoRoutes from './TodoRoutes';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path='/' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/todo/*' element={<TodoRoutes />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;