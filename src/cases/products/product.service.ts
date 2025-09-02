import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { category } from "../categories/category.entity"; // Corrigido nome da entidade

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>
  ) {}

  async findAll(categoryId?: string): Promise<Product[]> {
    if (categoryId) {
      return this.repository.find({
        where: {
          category: { id: categoryId }, // Assumindo que existe relação entre Product e Category
        },
        relations: ['category'], // Inclui os dados da categoria se necessário
      });
    }

    return this.repository.find({ relations: ['category'] });
  }

  findById(id: string): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category'], // Inclui a categoria ao buscar o produto
    });
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
