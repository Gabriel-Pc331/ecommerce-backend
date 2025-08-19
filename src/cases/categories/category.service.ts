import { category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class categoryService {
    delete(id: string): void | PromiseLike<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(category)
        private repository: Repository<category>
    ) {}

    findAll(): Promise<category[]> {
        return this.repository.find();

    }

    async fyndById(id: string): Promise<category> {
        const found = await this.repository.findOneBy({ id: id });
        if (!found) {
            throw new Error(`Category with id ${id} not found`);
        }
        return found;
    }
     save(category : category): Promise<category> {
        return this.repository.save(category);
        
}

     async remove(id: string): Promise<void> {

        await this.repository.delete(id);
       
    }   
}