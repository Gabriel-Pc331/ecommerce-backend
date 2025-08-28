import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { categoryService } from './category.service';
import { category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: categoryService) {}

  @Get()
  findAll(): Promise<category[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<category> {
    const found = await this.service.findById(id); // tipar como Promise<category | null> no service
    if (found === null) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  create(@Body() c: category): Promise<category> {
    return this.service.save(c);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() c: category,
  ): Promise<category> {
    const exists = await this.service.findById(id);
    if (exists === null) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    c.id = id;
    return this.service.save(c);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const exists = await this.service.findById(id);
    if (exists === null) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    await this.service.remove(id);
  }
}
