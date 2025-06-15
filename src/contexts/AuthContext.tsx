'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {AuthContextType, UserRole, UserSession} from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userSession');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem('userSession');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (session: UserSession) => {
        setUser(session);
        localStorage.setItem('userSession', JSON.stringify(session));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userSession');
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === UserRole.Admin || user?.role === UserRole.Dev;
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;