
'use client';

import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, Box } from '@mui/material';


const mockListings = [
    { id: 1, server: 'Erathia', amount: '50M', price: 'R$ 10,00/M', status: 'Ativo' },
    { id: 2, server: 'Pandora', amount: '100M', price: 'R$ 9,50/M', status: 'Ativo' },
    { id: 3, server: 'Erathia', amount: '25M', price: 'R$ 11,00/M', status: 'Pausado' },
];

export default function MyListingsPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Meus Anúncios
            </Typography>
            <Grid container spacing={3}>
                {mockListings.map((listing) => (
                    <Grid item key={listing.id} xs={12} sm={6} md={4}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="div">
                                    {listing.amount} de Kamas
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Servidor: {listing.server}
                                </Typography>
                                <Typography variant="body1">
                                    Preço: <strong>{listing.price}</strong>
                                </Typography>
                                <Typography variant="body2" color={listing.status === 'Ativo' ? 'success.main' : 'warning.main'}>
                                    Status: {listing.status}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Editar</Button>
                                <Button size="small" color="error">Excluir</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}