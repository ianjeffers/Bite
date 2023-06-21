// api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export async function generateContent(context) {
    const response = await axios.post(`${API_URL}/generate`, { context });
    return response.data;
}

export async function generateFlashcard(context) {
    const response = await axios.post(`${API_URL}/flashcard`, { context });
    return response.data;
}

export async function queryContent(query) {
    const response = await axios.post(`${API_URL}/query`, { query });
    return response.data;
}
