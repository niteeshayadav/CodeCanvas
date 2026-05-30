import { useParams } from 'react-router-dom';
import api from './api';

const createSnippet = async ({title,language,code,description,tags}) => {
    try {
        const response = await api.post('/snippets', {title,language,code,description,tags});
        return response.data;
    } catch (error) {
        console.error('Create Snippet error:', error);
        throw error;
    }
};

const getSnippets = async (filter) => {
    try {
        const response = await api.get('/snippets',{
            params: filter
        });
        return response.data;
    } catch (error) {
        console.error('Get Snippets error:', error);
        throw error;
    }
};

const getSnippetById = async (id) => {
    try {
        const response = await api.get(`/snippets/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get Snippet by ID error:', error);
        throw error;
    }
};

const updateSnippet = async (id, {title,language,code,description,tags}) => {
    try {
        const response = await api.patch(`/snippets/${id}`, {title,language,code,description,tags});
        return response.data;
    } catch (error) {
        console.error('Update Snippet error:', error);
        throw error;
    }
};

const deleteSnippet = async (id) => {
    try {
        const response = await api.delete(`/snippets/${id}`);
        return response.data;
    } catch (error) {
        console.error('Delete Snippet error:', error);
        throw error;
    }   
};

const pinSnippet = async (id) => {
    try{
        const response = await api.patch(`/snippets/${id}/pin`);
        return response.data;
    } catch (error) {
        console.error('Pin Snippet error:', error);
        throw error;
    }
}

const searchSnippets = async (searchQuery) => {
    try {
        const response = await api.get('/snippets/search',{
            params: {
                q: searchQuery
            }
        });
        return response.data;
    } catch (error) {
        console.error(error?.response?.data?.message || 'Search Snippets error:');
        throw error;
    }
}

const snippetService = {
    createSnippet,
    getSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
    pinSnippet,
    searchSnippets
};

export default snippetService;