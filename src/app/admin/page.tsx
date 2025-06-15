
import React from 'react';
import { Box, Typography } from '@mui/material';



async function AdminDashboardPage() {
    return (
        <Box sx={{ mt: 4, ml: 2 }}> {/* Margem para o conteúdo principal */}
            <Typography variant="h4" component="h1" gutterBottom color="primary.main">
                Dashboard do Administrador
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Bem-vindo ao painel de administração. Use o menu lateral para navegar pelas funcionalidades.
            </Typography>
            {/* Aqui você pode adicionar cards de resumo, estatísticas, etc. */}
            <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'grey.400', borderRadius: 2 }}>
                <Typography variant="h6" color="text.primary">Conteúdo do Dashboard em construção...</Typography>
                <Typography variant="body2" color="text.secondary">
                    Em breve, gráficos, métricas e atalhos importantes aparecerão aqui.
                </Typography>
            </Box>
        </Box>
    );
}

export default AdminDashboardPage;