export interface Advertising {
    id: string;
    title: string;
    kamas_amount: number;
    price: number;
    description: string;
    seller_name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface PaginatedAdvertisingsResponse {
    data: Advertising[];
    total: number;
    limit: number;
    offset: number;
    current_page: number;
    total_pages: number;
}