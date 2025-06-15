
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Alert,
    Chip,
    Grid,
    Divider,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchSingleAdminLog, LogEntry } from '@/api/admin';




const DetailItem = ({ title, children, sx = {} }: { title: string, children: React.ReactNode, sx?: object }) => (
    <Box sx={{ mb: 2, ...sx }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase' }}>
            {title}
        </Typography>
        <Box component="div">{children}</Box>
    </Box>
);


const LogLevelChip = ({ level }: { level: string }) => {
    const colorMap: { [key: string]: 'error' | 'warning' | 'info' | 'primary' | 'default' } = {
        'ERROR': 'error',
        'WARN': 'warning',
        'INFO': 'info',
    };
    return <Chip label={level} color={colorMap[level] || 'default'} sx={{ fontWeight: 'bold' }} />;
};


const StatusChip = ({ status }: { status: number }) => {
    let color: 'success' | 'warning' | 'error' | 'info' = 'info';
    if (status >= 200 && status < 300) color = 'success';
    if (status >= 400 && status < 500) color = 'warning';
    if (status >= 500) color = 'error';
    return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
};




export default function LogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const logId = params.logId as string;

    const [log, setLog] = useState<LogEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (logId) {
            const getLog = async () => {
                setLoading(true);
                try {
                    const data = await fetchSingleAdminLog(logId);
                    setLog(data);
                } catch (err) {
                    setError('Não foi possível carregar os detalhes do log.');
                } finally {
                    setLoading(false);
                }
            };
            getLog();
        }
    }, [logId]);

    
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    
    if (error) {
        return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
    }

    
    if (!log) {
        return <Alert severity="info" sx={{ m: 4 }}>Log não encontrado.</Alert>;
    }

    
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    Detalhes do Log
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Coluna Principal (Conteúdo do Log) */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>Mensagem</Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-word' }}>
                            {log.msg}
                        </Typography>
                    </Paper>

                    {log.request && (
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>Detalhes da Requisição</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}><DetailItem title="Status"><StatusChip status={log.request.status} /></DetailItem></Grid>
                                <Grid item xs={6} sm={3}><DetailItem title="Método">{log.request.method}</DetailItem></Grid>
                                <Grid item xs={12} sm={6}><DetailItem title="Caminho">{log.request.path}</DetailItem></Grid>
                            </Grid>
                            {log.request.request_body && (
                                <DetailItem title="Corpo da Requisição">
                                    <Paper component="pre" variant="outlined" sx={{ p: 2, mt: 1, backgroundColor: 'background.default', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem' }}>
                                        {JSON.stringify(log.request.request_body, null, 2)}
                                    </Paper>
                                </DetailItem>
                            )}
                        </Paper>
                    )}

                    {log.error && (
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom color="error.main">Detalhes do Erro</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Paper component="pre" variant="outlined" sx={{ p: 2, backgroundColor: 'background.default', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem' }}>
                                {log.error}
                            </Paper>
                        </Paper>
                    )}
                </Grid>

                {/* Coluna Lateral (Metadados) */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, position: 'sticky', top: '24px' }}>
                        <Typography variant="h6" gutterBottom>Metadados</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <DetailItem title="Nível"><LogLevelChip level={log.level} /></DetailItem>
                        <DetailItem title="Horário">{new Date(log.time).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'medium' })}</DetailItem>
                        {log.request && (
                            <DetailItem title="Latência">{`${(log.request.latency / 1_000_000).toFixed(2)} ms`}</DetailItem>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>Origem</Typography>
                        <DetailItem title="Arquivo">{log.source.file.split(/[\\/]/).pop()}</DetailItem>
                        <DetailItem title="Função" sx={{ '& .MuiTypography-root': { wordBreak: 'break-all' } }}>{log.source.function}</DetailItem>
                        <DetailItem title="Linha">{log.source.line}</DetailItem>
                        {log.request && (
                            <DetailItem title="Endereço IP">{log.request.ip_address}</DetailItem>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}