
'use client';

import React from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const mockHistory = [
    { id: 1, date: '10/06/2025', otherParty: 'VendedorX', amount: '10M', value: 'R$ 100,00', status: 'Concluída' },
    { id: 2, date: '11/06/2025', otherParty: 'SuperVendas', amount: '20M', value: 'R$ 190,00', status: 'Concluída' },
];

export default function PurchaseHistoryPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Histórico de Compras
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Vendedor</TableCell>
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