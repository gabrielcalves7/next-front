
'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/api/auth';
import { UserRole } from '@/types/auth.types'; 

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(email, password);
            const userSession = { token: response.token, role: response.role, userID: response.userId };
            login(userSession);

            
            
            const hasAdminAccess = response.role === UserRole.Admin || response.role === UserRole.Dev;

            if (hasAdminAccess) {
                router.push('/admin'); 
            } else {
                router.push('/'); 
            }

        } catch (err: any) {
            console.error('Login failed:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Credenciais inválidas. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Entrar
                </Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Entrar'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href="/register" passHref style={{ textDecoration: 'none' }}>
                            <Button variant="text">
                                Não tem uma conta? Cadastre-se
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}