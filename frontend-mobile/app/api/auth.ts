import api from './api';

type UserRegistrationDetails = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const registerAPI = async (data: UserRegistrationDetails) => {
    const response = await api.post('/auth/register/', data);
};