import { CostumerService } from "./costumer.service";
import { Costumer } from "./costumer.entity";
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";

@Controller('costumers')
export class CostumerController {

    constructor(private readonly service: CostumerService) { }

    @Get()
    findAll(): Promise<Costumer[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Costumer> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Costumer not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    create(@Body() costumer: Costumer): Promise<Costumer> {
        return this.service.save(costumer);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() costumer: Costumer): Promise<Costumer> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Costumer not found', HttpStatus.NOT_FOUND);
        }

        costumer.id = id;

        return this.service.save(costumer);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Costumer not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);
    }
}