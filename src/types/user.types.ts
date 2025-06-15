
import { UserRole } from './auth.types';

export interface User {
    id: string;
    full_name: string;
    username: string;
    character_name: string;
    pix_key: string;
    email: string;
    phone: string;
    role: UserRole;
    is_active: boolean;
    verified: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface UpdateUserPayload {
    full_name?: string;
    email?: string;
    phone?: string;
    character_name?: string; 
    pix_key?: string;        
    role?: UserRole;
    password?: string;
    is_active?: boolean;
}
export interface PaginatedUsersResponse {
    data: User[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface UserFormData {
    full_name: string;
    username: string;
    email: string;
    phone: string;
    character_name: string;
    pix_key: string;
    role: number;
    is_active: boolean;
    verified: boolean;
    password?: string;
}