import { City } from "@/src/domains/city/City";
import { useWindowDimensions } from "react-native";
import MapView from "react-native-maps";
import { BottomSheet, BottomSheetProps } from "../components/BottomSheet";
import { Box } from "../components/Box";
import { IconButton } from "../components/IconButton";
import { useAppTheme } from "../theme/useAppTheme";

/**
 * Meu BottomSheetMapProps vai ser quase igual o BottomSheetProps mas vou Omit(Omitir)
 * algumas informações, no caso o children
 */
type BottomSheetMapProps = Omit<BottomSheetProps, "children"> & {
  location: City["location"];
};
/**
 * Omit<BottomSheetProps, 'children' | 'duration'> - caso queira omitir mais algum outro
 */

export function BottomSheetMap({
  location,
  ...bottomSheetProps
}: BottomSheetMapProps) {
  //
  const { height } = useWindowDimensions(); // Altura da tela do usuário
  const { borderRadii, spacing } = useAppTheme();
  //
  return (
    <BottomSheet {...bottomSheetProps}>
      <MapView
        style={{
          width: "100%",
          height: height * 0.7, // pega a altura da tela e aplica 70% (0.7)
          borderRadius: borderRadii.default,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.2,
        }}
      />
      <Box position="absolute" top={spacing.padding} right={spacing.padding}>
        <IconButton iconName="Close" onPress={bottomSheetProps.onPress} />
      </Box>
    </BottomSheet>
  );
}
