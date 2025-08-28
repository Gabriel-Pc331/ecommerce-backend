import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { category } from './category.entity';

@Injectable()
export class categoryService {
  constructor(
    @InjectRepository(category)
    private readonly repo: Repository<category>,
  ) {}

  findAll(): Promise<category[]> {
    return this.repo.find();
  }

  // Retorna null quando não encontrar (compatível com strictNullChecks)
  findById(id: string): Promise<category | null> {
    return this.repo.findOne({ where: { id } });
  }

  // Cria/atualiza (TypeORM faz upsert pelo id presente no objeto)
  save(c: category): Promise<category> {
    return this.repo.save(c);
  }

  // Remove e lança 404 se nada foi afetado
  async remove(id: string): Promise<void> {
    const res = await this.repo.delete(id);
    if (!res.affected) {
      throw new NotFoundException('Category not found');
    }
  }

  // (Opcional) helper para já lançar 404
  async findByIdOrThrow(id: string): Promise<category> {
    const found = await this.findById(id);
    if (found === null) throw new NotFoundException('Category not found');
    return found;
  }
}
