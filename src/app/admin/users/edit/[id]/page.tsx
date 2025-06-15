
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Alert, Button, Paper } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types';
import { getUserById, updateUser, UpdateUserPayload, User } from '@/api/users';
import UserForm, { UserFormData } from '@/components/UserForm';

function UserEditPage() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userIdParam = Array.isArray(id) ? id[0] : id;
            if (!userIdParam) {
                setError('ID do usuário não fornecido na URL.');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const userData = await getUserById(userIdParam);
                setUser(userData);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Não foi possível carregar os dados do usuário.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleUpdateUser = async (formData: UserFormData) => {
        const userIdParam = Array.isArray(id) ? id[0] : id;
        if (!userIdParam || !user) {
            setError('Dados do usuário não encontrados para realizar a comparação.');
            return;
        }

        setSubmitLoading(true);
        setError(null);
        setSuccess(null);

        
        const payload: Partial<UpdateUserPayload> = {};
        
        const keysToIgnore: (keyof UserFormData)[] = ['password', 'username'];

        
        for (const key in formData) {
            const formKey = key as keyof UserFormData;

            
            if (keysToIgnore.includes(formKey)) {
                continue;
            }

            
            
            if (formData[formKey] !== (user as any)[formKey]) {
                (payload as any)[formKey] = formData[formKey];
            }
        }

        
        if (formData.password && formData.password.trim() !== '') {
            payload.password = formData.password;
        }

        
        if (Object.keys(payload).length === 0) {
            setSuccess('Nenhuma alteração detectada.');
            setSubmitLoading(false);
            return;
        }

        
        try {
            await updateUser(userIdParam, payload);
            setSuccess('Usuário atualizado com sucesso!');
            const updatedUserData = { ...user, ...payload };
            setUser(updatedUserData as User);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao atualizar o usuário.');
        } finally {
            setSubmitLoading(false);
        }
    };
    if (loading) {
        return <Container sx={{display: 'flex', justifyContent: 'center', mt: 8}}><CircularProgress/></Container>;
    }

    if (error && !user) {
        return <Container sx={{mt: 4}}><Alert severity="error">{error}</Alert></Container>;
    }

    return (
        <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Container maxWidth="md" sx={{mt: 4, mb: 4}}>
                <Typography variant="h4" gutterBottom color="primary.main" sx={{mb: 3}}>
                    Editar Usuário
                </Typography>
                {success && <Alert severity="success" sx={{mb: 2}}>{success}</Alert>}
                <Box component={Paper} sx={{p: 4, borderRadius: 2, boxShadow: 3}}>
                    {user && (
                        <UserForm
                            initialData={user}
                            onSubmit={handleUpdateUser}
                            loading={submitLoading}
                            error={error}
                            isEditMode={true}
                        />
                    )}
                </Box>
            </Container>
        </AuthGuard>
    );
}

export default UserEditPage;