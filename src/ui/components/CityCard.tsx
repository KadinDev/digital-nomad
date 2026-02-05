import { CityPreview } from "@/src/domains/city/City";
import { Link } from "expo-router";
import { ImageBackground, ImageBackgroundProps, Pressable } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { BlackOpacity } from "./BlackOpacity";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps["style"];
};

export function CityCard({ cityPreview, style }: CityCardProps) {
  const { borderRadii } = useAppTheme();

  return (
    /**
     * push = da React Navigation, ele vai colocar outra Screen em cima da nossa Screen,
     * se usa ele quando vc quer navegar multiplas vezes para a mesma tela
     */
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={
            typeof cityPreview.coverImage === "number"
              ? cityPreview.coverImage
              : { uri: cityPreview.coverImage }
          }
          //
          // style = com ImageBackgroundProps, eu refazer o style desse card(somente o estilo que já defini aqui)
          // em outro lugar que eu chamar ele e assim desejar refazer
          style={[{ width: "100%", height: 280 }, style]}
          //
          imageStyle={{ borderRadius: borderRadii.default }}
        >
          <BlackOpacity />

          <Box flex={1} padding="s24" justifyContent="space-between">
            <Box alignSelf="flex-end">
              <Icon name="Favorite-outline" color="text" />
            </Box>

            <Box>
              <Text variant="title22"> {cityPreview.name} </Text>
              <Text variant="text16"> {cityPreview.country} </Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
