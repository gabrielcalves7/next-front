
'use client'; 

import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Box, IconButton, CircularProgress, Alert, Button, TablePagination
} from '@mui/material';
import {
    Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon
} from '@mui/icons-material';
import { getAllUsers, deleteUser, User, PaginatedUsersResponse } from '@/api/users'; 
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

function UserListPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10); 
    const [totalUsers, setTotalUsers] = useState(0); 
    const router = useRouter();

    const fetchUsersData = useCallback(async () => {
        try {
            setLoading(true);
            setError(''); 
            const response: PaginatedUsersResponse = await getAllUsers(page + 1, rowsPerPage); 
            setUsers(response.users || []);
            setTotalUsers(response.total || 0); 
        } catch (err: any) {
            console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível carregar os usuários.');
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage]); 

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]); 


    const handleDelete = async (userId: string) => {
        if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                setLoading(true); 
                setError('');
                await deleteUser(userId);
                
                await fetchUsersData();
            } catch (err: any) {
                console.error('Failed to delete user:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.error || 'Não foi possível deletar o usuário.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (userId: string) => {
        router.push(`/admin/users/edit/${userId}`);
    };

    const getRoleName = (role: UserRole) => {
        switch (role) {
            case UserRole.Admin:
                return 'Admin';
            case UserRole.Buyer:
                return 'Comprador';
            case UserRole.Seller:
                return 'Vendedor';
            case UserRole.Analyzer:
                return 'Analista';
            case UserRole.Dev:
                return 'Desenvolvedor';
            default:
                return 'Desconhecido';
        }
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };


    if (loading && users.length === 0) { 
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>Carregando usuários...</Typography>
                </Box>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Box sx={{ mt: 4, mb: 4, p: 3 }}>
                <Typography variant="h4" gutterBottom color="primary.main" sx={{ mb: 3 }}>
                    Listagem de Usuários
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" onClick={() => router.push('/admin/users/create')}>
                        Criar Novo Usuário
                    </Button>
                </Box>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
                        <TableHead sx={{ backgroundColor: 'primary.light' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome Completo</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome de Usuário</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Telefone</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ativo</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Verificado</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Criado Em</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Atualizado Em</TableCell>
                                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 && !loading ? (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.full_name}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{getRoleName(user.role)}</TableCell>
                                        <TableCell>{user.is_active ? 'Sim' : 'Não'}</TableCell>
                                        <TableCell>{user.verified ? 'Sim' : 'Não'}</TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => console.log('View', user.id)} color="info" aria-label="ver detalhes">
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(user.id)} color="primary" aria-label="editar usuário">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.id)} color="error" aria-label="deletar usuário">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={totalUsers}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelRowsPerPage="Usuários por página:"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                        }
                    />
                </TableContainer>
            </Box>
        </AuthGuard>
    );
}

export default UserListPage;