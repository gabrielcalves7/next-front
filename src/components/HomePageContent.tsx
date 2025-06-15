
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
    Typography,
    Container,
    Box,
    Button,
    Grid,
    Paper,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CircularProgress
} from '@mui/material';
import { UserRole } from '@/types/auth.types';


import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import CodeIcon from '@mui/icons-material/Code';
import LogoutIcon from '@mui/icons-material/Logout';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const HomePageContent = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
            <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    const getRoleName = (roleValue: UserRole): string => {
        switch (roleValue) {
            case UserRole.Admin: return "Admin";
            case UserRole.Buyer: return "Comprador";
            case UserRole.Seller: return "Vendedor";
            case UserRole.Analyzer: return "Analista";
            case UserRole.Dev: return "Desenvolvedor";
            default: return "Desconhecida";
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    
    const renderRoleDashboard = () => {
        switch(user.role) {
            case UserRole.Seller: {
                return (
                    <Paper sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>Painel do Vendedor</Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>Acesse rapidamente as ferramentas para gerenciar suas vendas e anúncios.</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant="contained" size="large" startIcon={<AddCircleOutlineIcon />} onClick={() => router.push('/advertisings/new')}>
                                    Novo Anúncio
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant="outlined" size="large" startIcon={<StorefrontIcon />} onClick={() => router.push('/advertisings/my-listings')}>
                                    Meus Anúncios
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="outlined" size="large" startIcon={<HistoryIcon />} onClick={() => router.push('/sales/history')}>
                                    Histórico de Vendas
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            }
            case UserRole.Buyer: {
                return (
                    <Paper sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>Área do Comprador</Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>Acompanhe suas compras e encontre as melhores ofertas.</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant="contained" size="large" startIcon={<TravelExploreIcon />} onClick={() => router.push('/list')}>
                                    Procurar Ofertas
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant="outlined" size="large" startIcon={<HistoryIcon />} onClick={() => router.push('/purchases/history')}>
                                    Histórico de Compras
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            }
            case UserRole.Analyzer: {
                return (
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box display="flex" alignItems="center">
                            <BarChartIcon sx={{mr: 1}}/>
                            <Typography variant="h5">Painel de Análise</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{mt: 1}}>Esta área está em desenvolvimento.</Typography>
                    </Paper>
                );
            }
            case UserRole.Dev: {
                return (
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Box display="flex" alignItems="center">
                            <CodeIcon sx={{mr: 1}}/>
                            <Typography variant="h5">Ferramentas Dev</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{mt: 1}}>Esta área está em desenvolvimento.</Typography>
                    </Paper>
                );
            }
            default: {
                return (
                    <Paper sx={{p: 3, height: '100%'}}>
                        <Typography variant="h5">Bem-vindo!</Typography>
                        <Typography color="text.secondary">Não há ações específicas para a sua função no momento.</Typography>
                    </Paper>
                );
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, mb: 4 }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {/* Coluna do Perfil (Sidebar) */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                            <PersonIcon sx={{ fontSize: 50 }} />
                        </Avatar>
                        <Typography variant="h6" component="h1">{user.userId}</Typography>
                        <Typography color="text.secondary" gutterBottom>{getRoleName(user.role)}</Typography>
                        <Divider sx={{ my: 2, width: '100%' }} />
                        <List component="nav" sx={{ width: '100%' }}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                                    <ListItemText primary="Sair" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Coluna Principal com Ações */}
                <Grid item xs={12} md={8}>
                    {renderRoleDashboard()}
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePageContent;