import { UserRole } from '@/types/auth.types';

export const getRoleName = (role: UserRole): string => {
    switch (role) {
        case UserRole.Admin: return "Administrador";
        case UserRole.Buyer: return "Comprador";
        case UserRole.Seller: return "Vendedor";
        case UserRole.Analyzer: return "Analista";
        case UserRole.Dev: return "Desenvolvedor";
        default: return "Desconhecido";
    }
};