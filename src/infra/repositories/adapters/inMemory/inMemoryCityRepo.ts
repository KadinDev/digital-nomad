import { City, CityPreview } from "@/src/domains/city/City";
import { CityFindAllFilters, ICityRepo } from "@/src/domains/city/iCityRepo";
import { cities } from "@/src/infra/repositories/adapters/inMemory/data/cities";

export class InMemoryCityRepo implements ICityRepo {
  async findById(id: string): Promise<City> {
    const city = cities.find((city) => city.id === id);
    if (city) {
      return city;
    }
    throw new Error("city not found");
  }

  async getRelatedCities(cityId: string): Promise<CityPreview[]> {
    const city = cities.find((city) => city.id === cityId);

    // esse relatedCitiesIds é o mesmo nome que coloquei no arquivo cities.ts
    // onde tem as informações das cidades
    return cities.filter((c) => city?.relatedCitiesIds.includes(c.id));
  }

  async findAll({
    name,
    categoryId,
  }: CityFindAllFilters): Promise<CityPreview[]> {
    let cityPreviewList = [...cities];

    if (name) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (categoryId) {
      cityPreviewList = cityPreviewList.filter((city) => {
        // some = se pelo menos uma dessas cidades ela tiver
        return city.categories.some((category) => category.id === categoryId);
      });
    }
    return cityPreviewList;
  }
}
