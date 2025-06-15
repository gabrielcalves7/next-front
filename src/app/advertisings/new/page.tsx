
'use client';

import React, { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute'; 
import { UserRole } from '@/types/auth.types'; 
import {
    Container, Paper, Typography, Grid, TextField, Button,
    Select, MenuItem, FormControl, InputLabel, Box, CircularProgress
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AuthGuard from '@/components/AuthGuard';

export default function NewListingPage() {
    const [server, setServer] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Formulário enviado!');
    };

    
    if (isChecking) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    
    return (
        <AuthGuard allowedRoles={[UserRole.Seller]}>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Criar Novo Anúncio
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Preencha os detalhes abaixo para publicar sua oferta de Kamas.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="server-select-label">Servidor</InputLabel>
                                <Select
                                    labelId="server-select-label"
                                    id="server-select"
                                    value={server}
                                    label="Servidor"
                                    onChange={(e) => setServer(e.target.value)}
                                >
                                    <MenuItem value={"Erathia"}>Erathia</MenuItem>
                                    <MenuItem value={"Pandora"}>Pandora</MenuItem>
                                    <MenuItem value={"Rubilax"}>Rubilax</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="amount"
                                name="amount"
                                label="Quantidade de Kamas (em milhões)"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="price"
                                name="price"
                                label="Preço por Milhão (R$)"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                name="description"
                                label="Descrição (opcional)"
                                placeholder="Ex: Entrega imediata, aceito propostas..."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" size="large" startIcon={<AddCircleOutlineIcon />}>
                                    Publicar Anúncio
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </AuthGuard>
    );
}