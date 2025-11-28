import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Costumer } from 'src/cases/customer/customer.entity';
import { Product } from 'src/cases/products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Costumer) private costumerRepo: Repository<Costumer>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto) {
    const { customerId, items } = dto;

    // 1 — Buscar cliente
    const costumer = await this.costumerRepo.findOne({
      where: { id: customerId },
    });

    if (!costumer) {
      throw new Error('Cliente não encontrado');
    }

    // 2 — Criar pedido (cabeçalho)
    const order = await this.orderRepo.save({
      costumer,
      status: 'NEW',
      total: 0,
    });

    // 3 — Criar itens
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await this.productRepo.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Produto não encontrado: ${item.productId}`);
      }

      const total = Number(product.price) * item.quantity;

      const orderItem = this.orderItemRepo.create({
        order,
        product,
        quantity: item.quantity,
        total,
      });

      orderItems.push(orderItem);
    }

    await this.orderItemRepo.save(orderItems);

    // 4 — Recalcular total do pedido
    const totalOrder = orderItems.reduce((acc, i) => acc + Number(i.total), 0);

    order.total = totalOrder;
    await this.orderRepo.save(order);

    // 5 — Retornar pedido completo
    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items', 'items.product', 'costumer'],
    });
  }
}
