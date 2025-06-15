import api from './index';
import {LoginResponse} from "@/types/auth.types";

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', {
        Username: email,
        Password: password,
    });
    return response.data;
};

export const registerUser = async (registerData: any): Promise<any> => {
    const response = await api.post('/register', registerData);
    console.log(response.data);
    return response.data;
};