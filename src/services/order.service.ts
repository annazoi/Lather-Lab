import { orderRepository } from '@/repositories/order.repository';
import { Order, OrderStatus } from '@prisma/client';

export class OrderService {
  async getAllOrders() {
    try {
      return await orderRepository.getAllOrders();
    } catch (error) {
      console.error('[ORDER_SERVICE_ERROR]: Fetch orders failed', error);
      throw new Error('Could not fetch orders');
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      return await orderRepository.updateStatus(id, status);
    } catch (error) {
      console.error('[ORDER_SERVICE_ERROR]: Status update failed', error);
      throw new Error('Could not update order status');
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      return await orderRepository.getOrdersByUserId(userId);
    } catch (error) {
      console.error('[ORDER_SERVICE_ERROR]: Fetch customer orders failed', error);
      throw new Error('Could not fetch order history');
    }
  }

  async create(data: { 
    userId: string; 
    total: number; 
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPhone: string;
    items: { productId: string; quantity: number; price: number }[] 
  }): Promise<Order> {
    try {
      return await orderRepository.createOrder(data);
    } catch (error) {
      console.error('[ORDER_SERVICE_ERROR]: Create order failed', error);
      throw new Error('Could not place order');
    }
  }
}

export const orderService = new OrderService();
