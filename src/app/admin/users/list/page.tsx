
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Box, IconButton, CircularProgress, Alert, Button, Pagination,
    Select, MenuItem, FormControl, InputLabel, Container, SelectChangeEvent
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { getAllUsers, deleteUser, User, PaginatedUsersResponse } from '@/api/users';
import AuthGuard from '@/components/AuthGuard';
import { UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import {TablePaginationControls} from "@/components/admin/TablePaginationControls";
import {UsersTable} from "@/components/admin/UsersTable";



function UserListPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState(1); 
    const [limit, setLimit] = useState(10); 
    const [totalUsers, setTotalUsers] = useState(0); 
    const [totalPages, setTotalPages] = useState(1); 
    const router = useRouter();

    
    const getRoleName = (roleNumber: UserRole): string => {
        switch (roleNumber) {
            case UserRole.Admin: return 'Administrador';
            case UserRole.Buyer: return 'Comprador';
            case UserRole.Seller: return 'Vendedor';
            case UserRole.Analyzer: return 'Analista';
            case UserRole.Dev: return 'Desenvolvedor';
            default: return 'Desconhecido';
        }
    };

    const fetchUsersData = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response: PaginatedUsersResponse = await getAllUsers(page, limit);
            setUsers(response.data || []);
            setTotalUsers(response.total);
            setTotalPages(response.total_pages);
            setPage(response.page); 
            setLimit(response.limit); 
        } catch (err: any) {
            console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível carregar os usuários.');
        } finally {
            setLoading(false);
        }
    }, [page, limit]); 

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]); 

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        setLimit(Number(event.target.value));
        console.log(event.target.value)
        setPage(1); 
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
            return;
        }
        try {
            setLoading(true);
            await deleteUser(userId);
            
            fetchUsersData();
        } catch (err: any) {
            console.error('Failed to delete user:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Não foi possível deletar o usuário.');
            setLoading(false); 
        }
    };

    const handleEdit = (userId: string) => {
        router.push(`/admin/users/edit/${userId}`);
    };

    if (loading) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="lg" sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ ml: 2 }}>Carregando usuários...</Typography>
                </Container>
            </AuthGuard>
        );
    }

    if (error) {
        return (
            <AuthGuard allowedRoles={[UserRole.Admin]}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Alert severity="error">{error}</Alert>
                    <Button onClick={fetchUsersData} variant="contained" sx={{ mt: 2 }}>
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
                    Listar Usuários
                </Typography>
                <UsersTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={ (id: string) => console.log('View', id) }
                />
                <TablePaginationControls
                    limit={limit}
                    onLimitChange={handleLimitChange}
                    totalPages={totalPages}
                    page={page}
                    onPageChange={handlePageChange}
                    totalItems={totalUsers}
                    itemName="Usuários"
                />
            </Box>
        </AuthGuard>
    );
}

export default UserListPage;