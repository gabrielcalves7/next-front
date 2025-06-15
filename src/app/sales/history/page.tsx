
'use client';

import React from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const mockHistory = [
    { id: 1, date: '08/06/2025', otherParty: 'CompradorA', amount: '50M', value: 'R$ 500,00', status: 'Concluída' },
    { id: 2, date: '09/06/2025', otherParty: 'CompradorB', amount: '10M', value: 'R$ 110,00', status: 'Concluída' },
];

export default function SalesHistoryPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Histórico de Vendas
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Comprador</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Valor Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockHistory.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.otherParty}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}