import { category } from "./category.entyty";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class categorService {

    constructor(
        @InjectRepository(category)
        private repository: Repository<category>
    ) {}

    findAll(): Promise<category[]> {
        return this.repository.find();

    }

    fyndById(id: string):Promise<category> {
        return this.repository.findOneBy({id: id});
        
    }
     save(category : category): Promise<category> {
        return this.repository.save(category);
        
}

     async remove(id: string): Promise<void> {

        await this.repository.delete(id);
       
    }   
}