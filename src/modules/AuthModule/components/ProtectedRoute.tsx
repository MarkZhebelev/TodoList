import React, {ReactNode} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {RootState} from '../../store/store';

interface ProtectedRouteProps {
    children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
