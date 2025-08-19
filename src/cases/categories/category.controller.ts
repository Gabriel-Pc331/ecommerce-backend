import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Delete } from "@nestjs/common";
import { categoryService } from "./category.service";
import { category } from "./category.entity";
import { constants } from "buffer";

@Controller('categories')
export class categorycontroller {

   constructor(private readonly Service: categoryService) {}

@Get()

    findAll(): Promise<category[]> {
        return this.Service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<category> {
        const found =  await this.Service.fyndById(id);
        if (found === null || found === undefined) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return found;
       
    }
    
    @Post()
    create(@Body()category:category) : Promise<category> {
        return this.Service.save(category);

}

@Put(':id')
async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() category: category): Promise<category> {
    const found = await this.Service.fyndById(id);

    if (found === null || found === undefined) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    category.id = id;
    return this.Service.save(category);
}

@Delete(':id')
@HttpCode(204)
async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    const found = await this.Service.findById(id);
    if (found === null || found === undefined) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return this.Service.delete(id);
}


}
