import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.eujzdzlunpsedekdtbej.supabase.co',
      port: 5432,
      username: 'postgres',
      password: '@Gpierin44',  
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
  ],
})
export class AppModule {}
