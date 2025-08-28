import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from './category.entity';
import { categoryService } from './category.service';
import { CategoryController } from './category.controller'; // ou categoryController, conforme seu controller

@Module({
  imports: [TypeOrmModule.forFeature([category])],
  providers: [categoryService],
  controllers: [CategoryController], // ajuste o nome exato do seu controller
  exports: [categoryService],
})
export class categoryModule {}
