import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('adminRole');

  if (!token || role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}