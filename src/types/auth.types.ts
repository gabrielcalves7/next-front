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

export interface AuthContextType {
    user: UserSession | null;
    login: (session: UserSession) => void;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export interface LoginRequest {
    Email: string;
    Password: string;
}

export interface LoginResponse {
    status: string;
    token: string;
    role: number;
    userId: string
}

