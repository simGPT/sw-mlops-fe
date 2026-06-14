import { client } from '@/api/auth';

export const createOrder = (items) => client.post('/api/orders', { items });
