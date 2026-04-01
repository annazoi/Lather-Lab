import { prisma } from '@/lib/prisma';
import { Order, Prisma, OrderStatus } from '@prisma/client';

export class OrderRepository {
  async getAllOrders(options?: Prisma.OrderFindManyArgs): Promise<Order[]> {
    return prisma.order.findMany({
      ...options,
      orderBy: options?.orderBy || { createdAt: 'desc' }
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status }
    });
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async countOrders(where?: Prisma.OrderWhereInput): Promise<number> {
    return prisma.order.count({ where });
  }

  async createOrder(data: { 
    userId: string; 
    total: number; 
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPhone: string;
    items: { productId: string; quantity: number; price: number }[] 
  }): Promise<Order> {
    return prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        shippingName: data.shippingName,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingPhone: data.shippingPhone,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });
  }
}

export const orderRepository = new OrderRepository();
