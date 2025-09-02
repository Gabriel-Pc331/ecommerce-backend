import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Costumer } from "./customer.entity";
import { CostumerService } from "./customer.service";
import { CostumerController } from "./customer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Costumer])],
    providers: [CostumerService],
    controllers: [CostumerController]
})
export class CostumerModule { }