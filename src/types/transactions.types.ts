


interface PurchaseRequest {
    AdvertisingID: string;
    Quantity: number;
}
interface PurchaseResponse {
    ID: string;
    AdvertisingID: string;
    BuyerID: string;
    Quantity: number;
    TotalPrice: number;
    Status: string;
}
