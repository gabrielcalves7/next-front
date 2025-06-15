export enum UserRole {
    Admin = 1,    
    Buyer = 2,    
    Seller = 3,   
    Analyzer = 4, 
    Dev = 5,      
}

export interface UserSession {
    token: string;
    userId: string;
    role: UserRole; 
}