
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';
import AdminSidebar from '@/components/AdminSidebar';
import { Box, CircularProgress, Container } from '@mui/material';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    const hasAdminAccess = user?.role === UserRole.Admin || user?.role === UserRole.Dev;

    useEffect(() => {
        
        if (!isLoading) {
            
            if (!user || !hasAdminAccess) {
                router.push('/login'); 
            }
        }
    }, [user, isLoading, hasAdminAccess, router]);

    
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    
    
    if (!hasAdminAccess) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    
    return (
        <Box sx={{ display: 'flex' }}>
            {/* O Header principal não está aqui, pois o admin tem sua própria navegação */}
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - 240px)` }}>
                {children}
            </Box>
        </Box>
    );
}