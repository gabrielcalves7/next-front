'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; 
import { UserRole } from '@/types/auth.types'; 
import { Box, CircularProgress, Typography } from '@mui/material';

interface AuthGuardProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
    const { user, isLoading, isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            
            return;
        }

        if (!isAuthenticated) {
            
            router.push('/login');
            return;
        }

        
        const userHasPermission = user && (allowedRoles.includes(user.role) || user.role === UserRole.Dev);

        if (!userHasPermission) {
            
            
            console.warn(`Access Denied: User role ${user?.role} not in allowed roles: ${allowedRoles.join(',')}`);
            
            router.push('/'); 
        }
    }, [isLoading, isAuthenticated, user, allowedRoles, router]);

    if (user?.role != UserRole.Dev && (isLoading || !isAuthenticated || !user || !allowedRoles.includes(user.role))) {
        
        
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>Verificando permissões...</Typography>
            </Box>
        );
    }

    
    return <>{children}</>;
};

export default AuthGuard;