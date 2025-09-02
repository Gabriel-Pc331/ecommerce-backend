import { Repository } from "typeorm";
import { Costumer } from "./customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CostumerService {

    constructor(
        @InjectRepository(Costumer)
        private repository: Repository<Costumer>
    ) { }

    findAll(): Promise<Costumer[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Costumer | null> {
        return this.repository.findOneBy({ id: id });
    }

    save(costumer: Costumer): Promise<Costumer> {
        return this.repository.save(costumer)
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}