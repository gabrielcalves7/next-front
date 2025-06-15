
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Container, CircularProgress, Paper } from '@mui/material';
import PublicHomePage from '@/components/PublicHomePage';
import { UserRole } from '@/types/auth.types';
import HomePageContent from '@/components/HomePageContent';

export default function Page() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const hasAdminAccess = user?.role === UserRole.Admin || user?.role === UserRole.Dev;

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && hasAdminAccess) {
                router.push('/admin');
            }
        }
    }, [isLoading, isAuthenticated, hasAdminAccess, router]);

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isAuthenticated && hasAdminAccess) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                <CircularProgress />
            </Container>
        );
    }

    return isAuthenticated ? <HomePageContent /> : <PublicHomePage />;
}