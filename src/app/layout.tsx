import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';

import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '../components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Seu App',
    description: 'Sua descrição',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                </AuthProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}