

import api from './index';

export const purchaseAdvertising = async (advertisingId: string, quantity: number): Promise<PurchaseResponse> => {
    const requestBody: PurchaseRequest = {
        AdvertisingID: advertisingId,
        Quantity: quantity,
    };
    const response = await api.post<PurchaseResponse>('/purchase', requestBody);
    return response.data;
};

export const getMyPurchases = async (): Promise<PurchaseResponse[]> => {
    const response = await api.get<PurchaseResponse[]>('/my-purchases');
    return response.data;
};