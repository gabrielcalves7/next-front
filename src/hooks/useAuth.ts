
'use client'; 

import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext'; 
import { AuthContextType } from '@/contexts/AuthContext'; 


export function useAuth(): AuthContextType {
    console.log('useAuth context:'); 

    const context = useContext(AuthContext);
    
    console.log('useAuth context:', context); 
    if (context === undefined) {
        
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}