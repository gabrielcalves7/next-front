
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Typography, Box, CircularProgress, Alert, Button, Container, Paper, Grid, Switch, FormControlLabel
} from '@mui/material';
import { getAdvertisingById, updateAdvertising, Advertising } from '@/api/advertisings'; 
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types'; 
import { useParams } from 'next/navigation'; 

function AdvertisingViewPage() {
    const { id } = useParams(); 
    const [advertising, setAdvertising] = useState<Advertising | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [updateStatusError, setUpdateStatusError] = useState<string>('');

    const fetchAdvertisingData = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError('');
            const data: Advertising = await getAdvertisingById(id as string);
            setAdvertising(data);
        } catch (err: any) {
            console.error('Failed to fetch advertising:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível carregar o anúncio.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchAdvertisingData();
    }, [fetchAdvertisingData]);

    const handleToggleActive = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!advertising) return;

        const newActiveStatus = event.target.checked;
        setIsUpdatingStatus(true);
        setUpdateStatusError('');

        try {
            
            setAdvertising(prev => prev ? { ...prev, active: newActiveStatus } : null);

            await updateAdvertising(advertising.id, { active: newActiveStatus });
            
            
        } catch (err: any) {
            console.error('Failed to update advertising status:', err.response ? err.response.data : err.message);
            setUpdateStatusError(err.response?.data?.error || 'Não foi possível atualizar o status do anúncio.');
            
            setAdvertising(prev => prev ? { ...prev, active: !newActiveStatus } : null);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (loading) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="md" sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>Carregando detalhes do anúncio...</Typography>
                </Container>
            </AuthGuard>
        );
    }

    if (error) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Alert severity="error">{error}</Alert>
                    <Button onClick={fetchAdvertisingData} variant="contained" sx={{ mt: 2 }}>
                        Tentar Novamente
                    </Button>
                </Container>
            </AuthGuard>
        );
    }

    if (!advertising) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Alert severity="warning">Anúncio não encontrado.</Alert>
                </Container>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Container maxWidth="md" sx={{ mt: 4, p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Detalhes do Anúncio
                </Typography>
                <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Título: {advertising.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Quantidade de Kamas: {advertising.kamas_amount}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Preço por Kamas: R${advertising.price.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Descrição: {advertising.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                ID do Vendedor: {advertising.seller_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={advertising.active}
                                        onChange={handleToggleActive}
                                        name="activeStatus"
                                        color="primary"
                                        disabled={isUpdatingStatus}
                                    />
                                }
                                label={advertising.active ? 'Ativo' : 'Inativo'}
                            />
                            {isUpdatingStatus && <CircularProgress size={20} sx={{ ml: 2 }} />}
                            {updateStatusError && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    {updateStatusError}
                                </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                                Criado Em: {new Date(advertising.created_at).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                                Última Atualização: {new Date(advertising.updated_at).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
                    <Button
                        variant="outlined"
                        onClick={() => window.history.back()} 
                    >
                        Voltar para a Lista
                    </Button>
                </Box>
            </Container>
        </AuthGuard>
    );
}

export default AdvertisingViewPage;