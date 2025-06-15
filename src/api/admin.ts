import {LogEntry, PaginatedLogResponse} from '@/types/admin.types';
import api from './index';

export const fetchPaginatedAdminLogs = async (page: number, limit: number, level?: string): Promise<PaginatedLogResponse> => {
    try {
        const params: { page: number; limit: number; level?: string } = { page, limit };
        if (level) {
            params.level = level;
        }
        const response = await api.get<PaginatedLogResponse>('/admin/logs', { params });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Falha ao buscar os logs paginados:", error);
        throw error;
    }
};

export const fetchSingleAdminLog = async (logId: string): Promise<LogEntry> => {
    try {
        const response = await api.get<LogEntry>(`/admin/logs/detail?line=${logId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(`Falha ao buscar o log com ID ${logId}:`, error);
        throw error;
    }
};