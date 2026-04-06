import axios from 'axios';

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/tables` });

export const getTables = () => api.get('/');
export const createTable = (data) => api.post('/', data);
export const updateTableStatus = (id, status) => api.put(`/${id}`, { status });
export const deleteTable = (id) => api.delete(`/${id}`);
export const transferTable = (source_table_id, target_table_id) => api.post('/transfer', { source_table_id, target_table_id });
export const checkoutTable = (id) => api.post(`/${id}/checkout`);
