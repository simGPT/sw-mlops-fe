import { client } from '@/api/auth';

export const createOrder = (items) => client.post('/api/orders', { items });

export const getOrders = () => client.get('/api/orders');

export const getOrderById = (orderId) => client.get(`/api/orders/${orderId}`);

export const returnOrderItem = (orderId, itemId) =>
  client.patch(`/api/orders/${orderId}/items/${itemId}/return`);
