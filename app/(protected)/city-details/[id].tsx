import { useCityFindById } from "@/src/domains/city/operations/useCityFindById";
import { Divider } from "@/src/ui/components/Divider";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { BottomSheetMap } from "@/src/ui/containers/BottomSheetMap";
import { CityDetailsHeader } from "@/src/ui/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/ui/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/ui/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/ui/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttractions } from "@/src/ui/containers/CityDetailsTouristAttractions";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); // pegar os parametros vindo da rota
  const { data: city } = useCityFindById(id);

  const bottomSheetIsOpen = useSharedValue(false);
  function toogleBottomSheet() {
    bottomSheetIsOpen.value = !bottomSheetIsOpen.value;
  }

  // Já resolve o tratamento de not found
  if (!city) {
    return (
      <Screen flex={1} justifyContent="center" alignItems="center">
        <Text>City not found</Text>
      </Screen>
    );
  }

  return (
    <>
      <Screen style={{ paddingHorizontal: 0 }} scrollable>
        <CityDetailsHeader
          id={city.id}
          coverImage={city.coverImage}
          categories={city.categories}
        />
        <CityDetailsInfo
          name={city.name}
          country={city.country}
          description={city.description}
        />

        <Divider paddingHorizontal="padding" />

        <CityDetailsTouristAttractions
          touristAttractions={city.touristAttractions}
        />

        <Divider paddingHorizontal="padding" />

        <Pressable onPress={toogleBottomSheet}>
          <CityDetailsMap location={city.location} />
        </Pressable>

        <Divider paddingHorizontal="padding" />

        <CityDetailsRelatedCities id={city.id} />
      </Screen>

      <BottomSheetMap
        location={city.location}
        isOpen={bottomSheetIsOpen}
        onPress={toogleBottomSheet}
      />
    </>
  );
}
