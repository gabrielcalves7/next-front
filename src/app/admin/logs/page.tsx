
'use client';

import React, { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    Grid, IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead, TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { fetchPaginatedAdminLogs, LogEntry } from '@/api/admin';


const ClientOnlyDate = ({ timeString }: { timeString: string }) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    if (!hasMounted) { return null; }
    return <>{new Date(timeString).toLocaleString('pt-BR')}</>;
};


const LogLevelChip = ({ level }: { level: string }) => {
    const colorMap: { [key: string]: 'error' | 'warning' | 'info' | 'default' } = {
        'ERROR': 'error', 'WARN': 'warning', 'INFO': 'info',
    };
    return <Chip label={level} color={colorMap[level] || 'default'} size="small" />;
};


export default function AdminLogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalLogs, setTotalLogs] = useState(0);
    
    const [levelFilter, setLevelFilter] = useState('ERROR');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getLogs = async () => {
            setLoading(true);
            try {
                
                
                
                const response = await fetchPaginatedAdminLogs(page + 1, rowsPerPage, levelFilter);
                setLogs(response.data);
                setTotalLogs(response.total);
            } catch (err) {
                setError('Não foi possível carregar os logs.');
            } finally {
                setLoading(false);
            }
        };
        getLogs();
    }, [page, rowsPerPage, levelFilter]);

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleLevelFilterChange = (event: SelectChangeEvent<string>) => {
        setLevelFilter(event.target.value);
        setPage(0);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Logs do Sistema
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={'auto'}>
                        {/* 2. Aplicado um tamanho mínimo diretamente no FormControl */}
                        <FormControl fullWidth sx={{ minWidth: 220 }}>
                            <InputLabel id="level-filter-label">Filtrar por Nível</InputLabel>
                            <Select
                                labelId="level-filter-label"
                                value={levelFilter}
                                label="Filtrar por Nível"
                                onChange={handleLevelFilterChange}
                            >
                                <MenuItem value=""><em>Todos</em></MenuItem>
                                <MenuItem value="INFO">INFO</MenuItem>
                                <MenuItem value="WARN">WARN</MenuItem>
                                <MenuItem value="ERROR">ERROR</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Horário</TableCell>
                                    <TableCell>Nível</TableCell>
                                    <TableCell>Mensagem</TableCell>
                                    <TableCell>Origem</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs && logs.map((log) => (
                                    <TableRow key={log.id} hover>
                                        <TableCell><ClientOnlyDate timeString={log.time} /></TableCell>
                                        <TableCell><LogLevelChip level={log.level} /></TableCell>
                                        <TableCell sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {log.msg}
                                        </TableCell>
                                        <TableCell>{log.source.file.split(/[\\/]/).pop()}:{log.source.line}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Ver Detalhes">
                                                <IconButton onClick={() => router.push(`/admin/logs/view/${log.id}`)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalLogs}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Linhas por página:"
                    />
                </Paper>
            )}
        </Container>
    );
}