
import {IconButton, Table, TableBody, TableCell, TableContainer} from '@mui/material';
import { User } from '@/types/user.types';
import {Paper, TableHead, TableRow} from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Delete, Edit} from '@mui/icons-material';

interface Props {
    users: User[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onView: (id: string) => void;
}

export const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete, onView }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome Completo</TableCell>
                        <TableCell>Nome de Usuário</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Função</TableCell>
                        <TableCell>Ativo</TableCell>
                        <TableCell>Verificado</TableCell>
                        <TableCell>Criado Em</TableCell>
                        <TableCell>Atualizado Em</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length === 0 ? (
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
                                <TableCell>{user.phone || 'N/A'}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.is_active ? 'Sim' : 'Não'}</TableCell>
                                <TableCell>{user.verified ? 'Sim' : 'Não'}</TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(user.updated_at).toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => onView(user.id)} color="info" aria-label="ver detalhes">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onEdit(user.id)} color="primary" aria-label="editar usuário">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(user.id)} color="error" aria-label="deletar usuário">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </TableContainer>
    )
}