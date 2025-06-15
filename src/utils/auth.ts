import { jwtDecode, JwtPayload } from 'jwt-decode'; 

interface MyTokenClaims extends JwtPayload {
    userID: string;
    role: number;
    email?: string;
    name?: string;
}

const USER_SESSION_KEY = 'userSession';

export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        const sessionString = localStorage.getItem(USER_SESSION_KEY);
        if (sessionString) {
            try {
                const parsedSession = JSON.parse(sessionString);
                return parsedSession.token || null;
            } catch (e) {
                console.error("Failed to parse user session from localStorage", e);
                localStorage.removeItem(USER_SESSION_KEY);
                return null;
            }
        }
    }
    return null;
};

export const decodeAuthToken = (): MyTokenClaims | null => {
    const token = getAuthToken();
    if (token) {
        try {
            const decoded = jwtDecode<MyTokenClaims>(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                return null;
            }
            return decoded;
        } catch (error) {
            console.error("Error decoding token:", error);
            if (typeof window !== 'undefined') {
                localStorage.removeItem(USER_SESSION_KEY);
            }
            return null;
        }
    }
    return null;
};

export const isAuthenticated = (): boolean => {
    return !!decodeAuthToken();
};

export const getUserRole = (): number | null => {
    const claims = decodeAuthToken();
    return claims ? claims.role : null;
};

export const getUserId = (): string | null => {
    const claims = decodeAuthToken();
    return claims ? claims.userID : null;
};

export const hasRole = (requiredRoles: number[]): boolean => {
    const userRole = getUserRole();
    if (userRole === null) return false;
    return requiredRoles.includes(userRole);
};