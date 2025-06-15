import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

interface AdvertisingCardProps {
    id: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
    imageUrl?: string;
}

const AdvertisingCard: React.FC<AdvertisingCardProps> = ({ id, title, description, quantity, price, imageUrl }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="180"
                    image={imageUrl}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
                    **{quantity} KKs**
                </Typography>
                <Typography variant="h5" color="primary" sx={{ mt: 1, fontWeight: 700 }}>
                    R$ {price.toFixed(2)} / KK
                </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
                <Link href={`/advertisings/${id}`} passHref>
                    <Button variant="contained" fullWidth>
                        Ver Detalhes
                    </Button>
                </Link>
            </Box>
        </Card>
    );
};

export default AdvertisingCard;