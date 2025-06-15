
'use client';

import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@mui/material';


const mockOffers = [
    {id: 1, seller: 'VendedorX', server: 'Erathia', amount: '50M', price: 'R$ 10,00/M', rating: 4.9},
    {id: 2, seller: 'SuperVendas', server: 'Pandora', amount: '100M', price: 'R$ 9,50/M', rating: 5.0},
    {id: 3, seller: 'KamasRapido', server: 'Erathia', amount: '25M', price: 'R$ 11,00/M', rating: 4.8},
];

export default function ListPage() {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Ofertas de Kamas
            </Typography>
            <Paper sx={{p: 2, mb: 4}}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                        <TextField fullWidth label="Procurar por vendedor..." variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={"w-2/12"}>
                        <TextField fullWidth select label="Filtrar por Servidor" defaultValue="">
                            <MenuItem value="">Todos os Servidores</MenuItem>
                            <MenuItem value="Erathia">Erathia</MenuItem>
                            <MenuItem value="Pandora">Pandora</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                {mockOffers.map((offer) => (
                    <Grid item key={offer.id} xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{offer.amount} Kamas</Typography>
                                <Typography
                                    color="text.secondary">Vendedor: {offer.seller} (⭐ {offer.rating})</Typography>
                                <Typography color="text.secondary">Servidor: {offer.server}</Typography>
                                <Typography variant="h6" color="primary.main" sx={{mt: 1}}>{offer.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="contained">Ver Detalhes</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}