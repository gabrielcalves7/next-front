'use client';

import React, { useState } from 'react';
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Collapse
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import BugReportIcon from '@mui/icons-material/BugReport';

const AdminSidebar = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [openUsers, setOpenUsers] = useState(false);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleClickUsers = () => {
        setOpenUsers(!openUsers);
    };

    return (
        <Box
            sx={{
                width: 240,
                flexShrink: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Box sx={{ p: 2, pt: { xs: 2, md: 4 } }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Painel Admin
                </Typography>
            </Box>
            <Divider />
            <List component="nav">
                <ListItemButton onClick={() => handleNavigation('/admin')}>
                    <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                <ListItemButton onClick={handleClickUsers}>
                    <ListItemIcon><GroupIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Usuários" />
                    {openUsers ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openUsers} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/admin/users/create')}>
                            <ListItemIcon><PersonAddIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Criar Usuário" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/admin/users/list')}>
                            <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Listar Usuários" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <Divider sx={{ my: 1 }} />
                <ListItemButton onClick={() => handleNavigation('/admin/advertisings/list')}>
                    <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Anúncios" />
                </ListItemButton>

                {user?.role === UserRole.Dev && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <ListItemButton onClick={() => handleNavigation('/admin/logs')}>
                            <ListItemIcon>
                                <BugReportIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Logs do Sistema" />
                        </ListItemButton>
                    </>
                )}
            </List>
        </Box>
    );
};

export default AdminSidebar;