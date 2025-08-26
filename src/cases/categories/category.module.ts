import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { category } from "./category.entity";
import { categoryService } from "./category.service";
import { categorycontroller } from "./category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([category])],
    providers: [categoryService],
    controllers: [categorycontroller]
})
export class CategoryModule { }