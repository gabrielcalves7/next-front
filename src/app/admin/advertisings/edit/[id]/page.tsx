
'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Button,
    Paper,
    Switch,
    FormControlLabel,
    TextField
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types';
import { getAdvertisingById, updateAdvertising, Advertising, UpdateAdvertisingPayload } from '@/api/advertisings';

/**
 * Componente de página para editar o status de um anúncio.
 * A atualização é feita em tempo real ao interagir com o switch.
 */
function AdvertisingEditPage() {
    const { id } = useParams();
    const router = useRouter();
    const advertisingId = Array.isArray(id) ? id[0] : id;

    
    const [advertising, setAdvertising] = useState<Advertising | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    
    useEffect(() => {
        if (!advertisingId) {
            setError('ID do anúncio não fornecido na URL.');
            setLoading(false);
            return;
        }

        const fetchAdvertisingData = async () => {
            try {
                setLoading(true);
                const data = await getAdvertisingById(advertisingId);
                setAdvertising(data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Não foi possível carregar os dados do anúncio.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdvertisingData();
    }, [advertisingId]);

    /**
     * Lida com a alteração do status do anúncio diretamente pelo switch.
     * Realiza uma chamada à API assim que o estado é alterado.
     * @param event - O evento de mudança do switch.
     */
    const handleToggleActive = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!advertising) return;

        const newActiveStatus = event.target.checked;
        const originalState = advertising;

        
        setError(null);
        setSuccess(null);
        setIsUpdating(true);

        
        setAdvertising(prev => (prev ? { ...prev, is_active: newActiveStatus } : null));

        const payload: UpdateAdvertisingPayload = { is_active: newActiveStatus };

        try {
            await updateAdvertising(advertising.id, payload);
            setSuccess(`Anúncio ${newActiveStatus ? 'ativado' : 'desativado'} com sucesso!`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao atualizar o anúncio.');
            
            setAdvertising(originalState);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error && !advertising) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom color="primary.main" sx={{ mb: 3 }}>
                    Editar Anúncio
                </Typography>

                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
                    {advertising && (
                        <>
                            {/* Campos de informação (somente leitura) */}
                            <TextField
                                label="Título do Anúncio"
                                value={advertising.title}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Descrição"
                                value={advertising.description}
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Vendedor"
                                value={advertising.seller_name}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                label="Preço (R$)"
                                value={`R$ ${advertising.price.toFixed(2)}`}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />

                            {/* Campo editável com atualização em tempo real */}
                            <Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={advertising.is_active}
                                            onChange={handleToggleActive}
                                            name="activeStatus"
                                            color="primary"
                                            disabled={isUpdating}
                                        />
                                    }
                                    label={advertising.is_active ? 'Anúncio Ativo' : 'Anúncio Inativo'}
                                />
                                {isUpdating && <CircularProgress size={24} sx={{ ml: 2 }} />}
                            </Box>

                            {/* Botão de Ação */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => router.back()}
                                    disabled={isUpdating}
                                >
                                    Voltar
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </AuthGuard>
    );
}

export default AdvertisingEditPage;
