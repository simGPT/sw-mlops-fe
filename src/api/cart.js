import { client } from '@/api/auth';

export const getCart = () => client.get('/api/cart');
