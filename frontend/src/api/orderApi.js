import axios from 'axios';

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/orders` });

export const getActiveOrderItems = (tableId) => api.get(`/${tableId}`);
export const addOrderItem = (data) => api.post('/', data);
