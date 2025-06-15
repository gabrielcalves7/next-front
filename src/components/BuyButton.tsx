'use client';

import React, { useState } from 'react';
import { Button, TextField, Box, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext'; 
import { useRouter } from 'next/navigation';
import { purchaseAdvertising } from '@/api/transactions'; 

interface BuyButtonProps {
    advertisingId: string;
    availableQuantity: number;
}

const BuyButton: React.FC<BuyButtonProps> = ({ advertisingId, availableQuantity }) => {
    const { user, loading: authLoading } = useAuth(); 
    const router = useRouter();
    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePurchase = async () => {
        if (!user) {
            
            router.push('/login');
            return;
        }

        if (quantityToBuy <= 0 || quantityToBuy > availableQuantity) {
            setError(`Por favor, insira uma quantidade entre 1 e ${availableQuantity}.`);
            return;
        }

        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            await purchaseAdvertising(advertisingId, quantityToBuy); 
            setSuccessMessage('Compra realizada com sucesso! Aguarde a confirmação do vendedor.');
            
            
        } catch (err: any) {
            console.error('Purchase failed:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.error || 'Falha ao concluir a compra. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    
    if (authLoading) {
        return <CircularProgress size={24} />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Quantidade a Comprar"
                type="number"
                value={quantityToBuy}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantityToBuy(isNaN(value) ? 0 : value);
                }}
                inputProps={{ min: 1, max: availableQuantity }}
                sx={{ width: 200 }}
                disabled={!user || availableQuantity === 0}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handlePurchase}
                disabled={loading || !user || quantityToBuy <= 0 || quantityToBuy > availableQuantity || availableQuantity === 0}
            >
                {loading ? <CircularProgress size={24} /> : (user ? 'Comprar Agora' : 'Faça login para comprar')}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
            {!user && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Você precisa estar logado para realizar uma compra. <Link href="/login" style={{ textDecoration: 'none' }}>Clique aqui para fazer login.</Link>
                </Typography>
            )}
            {availableQuantity === 0 && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Este anúncio está sem estoque.
                </Typography>
            )}
        </Box>
    );
};

export default BuyButton;