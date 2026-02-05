import { Category } from "@/src/domains/category/Category";
import { ICategoryRepo } from "@/src/domains/category/iCategoryRepo";
import { categories } from "@/src/infra/repositories/adapters/inMemory/data/categories";

export class InMemoryCategoryRepo implements ICategoryRepo {
  // findAll vem desse IcategoryRepo
  async findAll(): Promise<Category[]> {
    return categories;
  }
}
