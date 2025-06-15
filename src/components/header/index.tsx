
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, Divider, Tooltip, Typography } from '@mui/material';

export function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path: string) => {
        router.push(path);
        handleCloseUserMenu();
    };

    const handleLogout = () => {
        logout();
        handleCloseUserMenu();
        router.push('/login');
    };

    const HeaderData = {
        title: 'AsKamas',
        links: [
            { href: '/list', label: 'Listagens' },
            { href: '/top-rated-sellers', label: 'Melhores Vendedores' },
            { href: '/about', label: 'Como Funciona' },
            { href: '/contact', label: 'Contato' },
        ],
    };

    return (
        <header className="bg-theme-dark text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-bold">
                    {HeaderData.title}
                </Link>
                <nav className="flex items-center justify-end w-full">
                    <ul className="hidden md:flex space-x-6 items-center">
                        {HeaderData.links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:text-gray-300">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Box sx={{ flexGrow: 0, ml: 4 }}>
                        {isAuthenticated && user ? (
                            
                            <>
                                <Tooltip title="Abrir menu">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>

                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => handleNavigate('/')}>
                                        <Typography textAlign="center">Meu Painel</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigate('/profile')}>
                                        <Typography textAlign="center">Perfil</Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center" color="error">Sair</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            
                            <ul className="flex space-x-4 items-center">
                                <li>
                                    <Link href="/login" className="text-theme-blue border-theme-blue rounded-lg border-2 px-3 py-2 text-sm hover:bg-theme-blue hover:text-white">
                                        Entrar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="bg-theme-blue rounded-lg border-theme-blue border-2 px-3 py-2 text-sm hover:bg-blue-500">
                                        Cadastrar
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </Box>
                </nav>
            </div>
        </header>
    );
}