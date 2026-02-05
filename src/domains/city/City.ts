import { Category } from "../category/Category";

export type TouristAttraction = {
  id: string;
  name: string;
  description: string;
  cityId: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  coverImage: number | string;
  description: string;
  touristAttractions: TouristAttraction[];
  location: {
    latitude: number;
    longitude: number;
  };
  categories: Category[];
  //relatedCitiesIds: string[];
};

// Dessa forma para pegar somente o que preciso para mostrar na Home,
// Dessa forma o FlatList não carregará todos os dados, somente o que passei abaixo que quero pegar
export type CityPreview = Pick<City, "id" | "name" | "country" | "coverImage">;
