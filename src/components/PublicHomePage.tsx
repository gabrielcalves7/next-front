'use client';

import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import SecurityIcon from '@mui/icons-material/Security';
import StarRateIcon from '@mui/icons-material/StarRate';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function PublicHomePage() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'background.default' }}>
            {/* Seção Hero */}
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                    color: 'text.primary',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        A maneira mais segura e rápida de negociar Kamas
                    </Typography>
                    <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
                        Conectamos vendedores e compradores em um ambiente seguro e verificado. Encontre as melhores ofertas ou anuncie suas Kamas hoje mesmo.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button variant="contained" color="primary" size="large" component={Link} href="/list">
                            Ver Ofertas
                        </Button>
                        <Button variant="outlined" color="secondary" size="large" component={Link} href="/register">
                            Quero Vender
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container sx={{ py: { xs: 8, md: 10 } }}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 600, mb: 6 }}>
                    Por que escolher a AsKamas?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                            <SecurityIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Segurança em Primeiro Lugar</Typography>
                            <Typography color="text.secondary">
                                Todas as transações são monitoradas e vendedores são verificados para garantir sua segurança.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                            <StarRateIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Melhores Vendedores</Typography>
                            <Typography color="text.secondary">
                                Encontre vendedores com as melhores reputações e negocie com confiança.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                            <AutoAwesomeIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                            <Typography variant="h6" gutterBottom>Processo Simplificado</Typography>
                            <Typography color="text.secondary">
                                Uma plataforma intuitiva e fácil de usar, desde o cadastro até a conclusão da sua troca.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}