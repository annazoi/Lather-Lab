import { prisma } from '@/lib/prisma';
import { Order, Prisma, OrderStatus } from '@prisma/client';

export class OrderRepository {
  async getAllOrders(options?: Prisma.OrderFindManyArgs) {
    return prisma.order.findMany({
      ...options,
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: options?.orderBy || { createdAt: 'desc' }
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: { include: { product: true } } }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // 1. If switching TO cancelled from another state -> Restore inventory
      if (status === OrderStatus.CANCELLED && order.status !== OrderStatus.CANCELLED) {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                increment: item.quantity
              }
            }
          });
        }
      }

      // 2. If switching FROM cancelled back to an active state -> Decrease inventory
      if (order.status === OrderStatus.CANCELLED && status !== OrderStatus.CANCELLED) {
        for (const item of order.items) {
          if (item.product.quantity < item.quantity) {
             throw new Error(`Cannot re-activate order: ${item.product.name} is out of stock.`);
          }
          await tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                decrement: item.quantity
              }
            }
          });
        }
      }

      return tx.order.update({
        where: { id },
        data: { status }
      });
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
    return prisma.$transaction(async (tx) => {
      // 1. Check and update product quantities
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { quantity: true, name: true }
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`);
        }

        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        });
      }

      // 2. Create the order
      return tx.order.create({
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
    });
  }
}

export const orderRepository = new OrderRepository();
