import { client } from '@/api/auth';

export const getProducts = () => client.get('/api/products');

export const getProductById = (productId) => client.get(`/api/products/${productId}`);

export const createViewLog = (productId) => client.post('/api/logs', { productId });
