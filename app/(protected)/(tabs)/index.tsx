import { useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";

import { useCategoryFindAll } from "@/src/domains/category/operations/useCategoryFindAll";
import { CityPreview } from "@/src/domains/city/City";
import { useCityFindAll } from "@/src/domains/city/operations/useCityFindAll";
import { Box } from "@/src/ui/components/Box";
import { CityCard } from "@/src/ui/components/CityCard";
import { Screen } from "@/src/ui/components/Screen";
import { CityFilter } from "@/src/ui/containers/CityFilter";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";
import { useDebounce } from "@/src/utils/hooks/useDebounce";
import { useScrollToTop } from "@react-navigation/native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // técnica para o input, para não ficar respondendo a cada letra que o usuário digitar dentro do input
  // mas terá um delay antes de responder
  const debouncedCityName = useDebounce(cityName);

  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets(); // Respeitar a StatusBar e Barra do Android

  const { data: cities } = useCityFindAll({
    name: debouncedCityName,
    categoryId: selectedCategoryId,
  });

  const { data: categories } = useCategoryFindAll();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef); // faz a Flatlist rolar automaticamente para cima

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="padding">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        data={cities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </Screen>
  );
}
