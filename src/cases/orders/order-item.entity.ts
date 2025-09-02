import { Costumer } from "src/cases/costumer/costumer.entity";
import { Product } from "src/cases/products/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";


@Entity('order-item')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    product: Product;

    @Column({ nullable: false })
    quantity: number;

    @Column('decimal', { nullable: true, precision: 10, scale: 2 })
    total: number;
}