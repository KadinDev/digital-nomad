import { Repositories } from "@/src/domains/Repositories";
//import { InMemoryAuthRepo } from "../inMemory/InMemoryAuthRepo";
import { SupabaseAuthRepo } from "./SupabaseAuthRepo";
import { SupabaseCategoryRepo } from "./SupabaseCategoryRepo";
import { SupabaseCityRepo } from "./SupabaseCityRepo";

export const SupabaseRepositories: Repositories = {
  //auth: new InMemoryAuthRepo(), // TODO replace with supabase auth implementation
  auth: new SupabaseAuthRepo(),
  city: SupabaseCityRepo,
  category: SupabaseCategoryRepo,
};
