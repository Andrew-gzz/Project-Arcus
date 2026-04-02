//frontend/src/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Intentamos obtener el usuario del localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 1. Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2. Si hay roles permitidos (ej. admin) y el usuario no lo tiene
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  // 3. Si todo está bien, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;
