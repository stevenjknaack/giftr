import { Alert } from 'react-native';
import api from '.';

type UserRegistrationDetails = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const callRegister = async (
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string
) => {
    return await api.post<Omit<UserRegistrationDetails, 'password'>>('/auth/register/', {
        username,
        email,
        firstName,
        lastName,
        password
    });
};

export const callLogin = async (username: string, password: string) => {
    return await api.post<{access: string; refresh: string;}>('https://giftr.dev/api/auth/token/', {username, password});
};