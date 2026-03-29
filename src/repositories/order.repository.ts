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
}

export const orderRepository = new OrderRepository();
