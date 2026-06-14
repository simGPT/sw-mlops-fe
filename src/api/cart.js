import { client } from '@/api/auth';

export const getCart = () => client.get('/api/cart');

export const addToCart = ({ productId, quantity }) =>
  client.post('/api/cart/items', { productId, quantity });

export const deleteCartItem = (itemId) => client.delete(`/api/cart/items/${itemId}`);

export const updateCartItemQuantity = (itemId, quantity) =>
  client.patch(`/api/cart/items/${itemId}`, { quantity });
