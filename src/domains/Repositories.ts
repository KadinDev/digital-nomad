import { IAuthRepo } from "./auth/IAuthRepo";
import { ICategoryRepo } from "./category/iCategoryRepo";
import { ICityRepo } from "./city/iCityRepo";

export type Repositories = {
  auth: IAuthRepo;
  city: ICityRepo;
  category: ICategoryRepo;
};
