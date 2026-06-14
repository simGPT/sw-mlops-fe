import { client } from '@/api/auth';

export const createOrder = (items) => client.post('/api/orders', { items });

export const getOrders = () => client.get('/api/orders');

export const getOrderById = (orderId) => client.get(`/api/orders/${orderId}`);
