import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db.<PROJECT-REF>.supabase.co',
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASS,
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
    ssl: true,
    })
  ],
})
export class AppModule {}
