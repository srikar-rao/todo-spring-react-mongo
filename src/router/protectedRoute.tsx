// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { hasAnyRole } from '../auth/keycloakService';

const ProtectedRoute = ({
  element,
  roles = [],
}: {
  element: JSX.Element;
  roles: string[];
}) => {
  return hasAnyRole(roles) ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
