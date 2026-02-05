import { Category, CategoryCode } from "@/src/domains/category/Category";
import { ICategoryRepo } from "@/src/domains/category/iCategoryRepo";
import { supabase } from "./supabase";

async function findAll(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    throw new Error("error trying to list categories");
  }

  return data.map((row) => ({
    id: row.id,
    description: row.description,
    name: row.name,
    code: row.code as CategoryCode,
  }));
}

export const SupabaseCategoryRepo: ICategoryRepo = {
  findAll,
};
