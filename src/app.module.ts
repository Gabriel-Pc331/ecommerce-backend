import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { categoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';

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
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    }),
    categoryModule,
    BrandModule,
    ProductModule,
  ],
})
export class AppModule {}
