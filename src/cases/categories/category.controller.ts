import { Controller, Get, Param } from "@nestjs/common";
import { categoryService } from "./category.service";
import { category } from "./category.entyty";

@Controller('categories')
export class categorycontroller {

   constructor(private readonly Service: categoryService) {}

@Get()

    findAll(): Promise<category[]> {
        return this.Service.findAll();
    }

    @Get(':id')
    findById(@Param(('id, ParseUUIDPipe')id: string)): Promise<category> {
       
    }


}



