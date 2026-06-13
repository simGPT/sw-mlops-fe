import { client } from '@/api/auth';

export const getProducts = () => client.get('/api/products');
