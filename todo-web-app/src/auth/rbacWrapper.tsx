import React, { type ReactNode } from 'react';
import { hasAnyRole } from './keycloakService';

interface RbacWrapperProps {
    allowedRoles: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

const RbacWrapper: React.FC<RbacWrapperProps> = ({ allowedRoles, children, fallback = null }) => {

    return hasAnyRole(allowedRoles) ? <>{children}</> : <>{fallback}</>;
};

export default RbacWrapper;
