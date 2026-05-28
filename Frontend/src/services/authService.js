import api from './api';

const login = async ({email, password, rememberMe}) => {
    try{
        const response = await api.post('/auth/login', {email, password,rememberMe});
        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const register = async ({username, fullname, email, password, rememberMe}) => {
    try{
        const response = await api.post('/auth/register', {username, fullname, email, password,rememberMe});
        console.log('Register response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Register error:', error.response ? error.response.data : error.message);
        throw error;
    }   
};

const logout = async () => {
    try{
        const response = await api.post('/auth/logout');
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout error:', error.response ? error.response.data : error.message);
        throw error;
    }   
};

const getCurrentUser = async () => {
    try{
        const response = await api.get('/auth/me');
        console.log('Get Current User response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get Current User error:', error.response ? error.response.data : error.message);
        throw error;
    }   
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser
};

export default authService;