
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Box, IconButton, CircularProgress, Alert, Button, Pagination,
    Select, MenuItem, FormControl, InputLabel, Container
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { getAllAdvertisings, deleteAdvertising, Advertising, PaginatedAdvertisingsResponse } from '@/api/advertisings'; 
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types'; 
import { useRouter } from 'next/navigation';

function AdvertisingsListPage() {
    const [advertisings, setAdvertisings] = useState<Advertising[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalAdvertisings, setTotalAdvertisings] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    const fetchAdvertisingsData = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response: PaginatedAdvertisingsResponse = await getAllAdvertisings(page, limit);
            console.log("RRR",response.data)
            setAdvertisings(response.data || []);
            setTotalAdvertisings(response.total);
            setTotalPages(response.total_pages);
            setPage(response.current_page); 
            setLimit(response.limit);
        } catch (err: any) {
            console.error('Failed to fetch advertisings:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível carregar os anúncios.');
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchAdvertisingsData();
    }, [fetchAdvertisingsData]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(event.target.value));
        setPage(1); 
    };

    const handleDelete = async (advertisingId: string) => {
        if (!window.confirm('Tem certeza que deseja deletar este anúncio?')) {
            return;
        }
        try {
            setLoading(true);
            await deleteAdvertising(advertisingId);
            fetchAdvertisingsData(); 
        } catch (err: any) {
            console.error('Failed to delete advertising:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível deletar o anúncio.');
            setLoading(false);
        }
    };

    const handleEdit = (advertisingId: string) => {
        router.push(`/admin/advertisings/edit/${advertisingId}`);
    };

    
    const handleView = (advertisingId: string) => {
        console.log('View advertising with ID:', advertisingId);
        
        
    };


    if (loading) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="lg" sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>Carregando anúncios...</Typography>
                </Container>
            </AuthGuard>
        );
    }

    if (error) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Alert severity="error">{error}</Alert>
                    <Button onClick={fetchAdvertisingsData} variant="contained" sx={{ mt: 2 }}>
                        Tentar Novamente
                    </Button>
                </Container>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Listar Anúncios
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="advertisings table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Quantidade de Kamas</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Vendedor</TableCell>
                                <TableCell>Ativo</TableCell>
                                <TableCell>Criado Em</TableCell>
                                <TableCell>Atualizado Em</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {advertisings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        Nenhum anúncio encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                advertisings.map((advertising) => (
                                    <TableRow
                                        key={advertising.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {advertising.id.substring(0, 8)}...
                                        </TableCell>
                                        <TableCell>{advertising.title}</TableCell>
                                        <TableCell>{advertising.kamas_amount}</TableCell>
                                        <TableCell>{advertising.price}</TableCell>
                                        <TableCell>{advertising.description}</TableCell>
                                        <TableCell>{advertising.seller_name}</TableCell>
                                        <TableCell>{advertising.is_active ? 'Sim' : 'Não'}</TableCell>
                                        <TableCell>{new Date(advertising.created_at).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(advertising.updated_at).toLocaleString()}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleView(advertising.id)} color="info" aria-label="ver detalhes">
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(advertising.id)} color="primary" aria-label="editar anúncio">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(advertising.id)} color="error" aria-label="deletar anúncio">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <FormControl variant="outlined" size="small">
                        <InputLabel>Itens por página</InputLabel>
                        <Select
                            value={limit}
                            onChange={handleLimitChange}
                            label="Itens por página"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                    <Typography variant="body2" color="text.secondary">
                        Total de Anúncios: {totalAdvertisings}
                    </Typography>
                </Box>
            </Box>
        </AuthGuard>
    );
}

export default AdvertisingsListPage;