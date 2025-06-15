
import api from '@/api';
import {PaginatedUsersResponse, UpdateUserPayload, User} from "@/types/user.types";


/**
 * Busca todos os usuários com suporte a paginação.
 * GET /api/v1/users/
 */
export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> => {
    try {
        const response = await api.get(`/users/?page=${page}&limit=${limit}`);
        const apiResponse = response.data;
        console.log('API Response:', response.data);
        
        return {
            ...apiResponse,
            page: apiResponse.current_page
        };
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

/**
 * Busca um usuário por ID.
 * GET /api/v1/users/:id
 * @param userId O ID do usuário a ser buscado.
 * @returns Promise<User>
 */
export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await api.get(`/users/${userId}`);
        console.log(response)
        
        console.log(response.data);

        return response.data.user
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};


/**
 * Atualiza um usuário por ID.
 * PUT /api/v1/users/:id
 */
export const updateUser = async (userId: string, payload: UpdateUserPayload): Promise<User> => {
    try {
        const response = await api.patch(`/users/${userId}`, payload);
        return response.data.user || response.data; 
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

/**
 * Deleta um usuário por ID.
 * DELETE /api/v1/users/:id
 */
export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await api.delete(`/users/${userId}`);
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
};


/**
 * Cria um novo usuário.
 * POST /api/v1/users/
 */
export const createUser = async (payload: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await api.post('/users/', payload);
        return response.data.user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};