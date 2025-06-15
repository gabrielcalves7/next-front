import api from './index';
import {Advertising, PaginatedAdvertisingsResponse} from "@/types/advertisings.types";

export const getAllAdvertisings = async (page: number, limit: number): Promise<PaginatedAdvertisingsResponse> => {
    const response = await api.get(`/advertisings/`, {
        params: { page, limit }
    });
    return response.data;
};

export const deleteAdvertising = async (id: string): Promise<void> => {
    await api.delete(`/advertisings/${id}`);
};
export const getAdvertisingById = async (id: string): Promise<Advertising> => {
    const response = await api.get(`/advertisings/${id}`);
    return response.data;
};

export const updateAdvertising = async (id: string, advertisingData: Partial<Advertising>): Promise<Advertising> => {
    const response = await api.patch(`/advertisings/${id}`, advertisingData);
    return response.data;
};
