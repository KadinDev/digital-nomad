import { Repositories } from "@/src/domains/Repositories";
import { InMemoryAuthRepo } from "./InMemoryAuthRepo";
import { InMemoryCategoryRepo } from "./InMemoryCategoryRepo";
import { InMemoryCityRepo } from "./inMemoryCityRepo";

export const InMemomyRepository: Repositories = {
  auth: new InMemoryAuthRepo(),
  city: new InMemoryCityRepo(),
  category: new InMemoryCategoryRepo(),
};
