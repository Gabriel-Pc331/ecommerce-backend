import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { categoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { CostumerModule } from './cases/customer/customer.module';
import { OrdersModule } from './cases/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    }),

    // Módulos da aplicação
    categoryModule,
    BrandModule,
    ProductModule,
    CostumerModule, // <-- ADICIONADO
    OrdersModule,   // <-- ADICIONADO
  ],
})
export class AppModule {}
