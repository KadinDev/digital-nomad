import { City, CityPreview } from "@/src/domains/city/City";
import { ICityRepo } from "@/src/domains/city/iCityRepo";

import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

// Tipando, dizendo que preciso retornar uma lista de CityPreview
async function findAll(filters: CityFilters): Promise<CityPreview[]> {
  try {
    //
    const fields = "id, name, country, cover_image";

    let cities;

    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(fields)
        .eq("category_id", filters.categoryId) // filtro por categoria
        .ilike("name", `%${filters.name}%`);
      cities = data;
    } else {
      const { data } = await supabase
        /**
         * -> * = pega todas as props
         * -> .ilike("name", `%${filters.name}%`)` = pegar o name, e filtrar por name
         */
        .from("cities")
        .select(fields)
        .ilike("name", `%${filters.name}%`);
      cities = data;
    }

    if (!cities) {
      throw new Error("data is not available");
    }

    return cities?.map(supabaseAdapter.toCityPreview);
  } catch (error) {
    throw error;
  }
}

async function findById(id: string): Promise<City> {
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*")
    .eq("id", id)
    .single(); // antes o data vinha como Objeto, usando o .single o data vem como uma linha única,
  // isso é o que precisa quando está fazendo uma busca pelo id

  if (error) {
    throw new Error("city not found!");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(cityId: string): Promise<CityPreview[]> {
  const { data } = await supabase
    .from("related_cities")
    .select("*")
    .eq("source_city_id", cityId)
    .throwOnError(); // o supabase vai lançar um erro, com ele, esse { data },
  // nunca vai retorno como null

  return data.map(supabaseAdapter.toCityPreview);
}

export const SupabaseCityRepo: ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
};
