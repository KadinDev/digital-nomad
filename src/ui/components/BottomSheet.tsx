import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export type BottomSheetProps = {
  onPress: () => void;
  isOpen: SharedValue<boolean>;
  duration?: number;
};

export function BottomSheet({
  onPress,
  children,
  isOpen,
  duration = 500,
}: PropsWithChildren<BottomSheetProps>) {
  //
  const height = useSharedValue(0);
  // se o modal estiver aberto ele vai para 0, se fechado ele vai para 1
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      // de acordo que eu for subindo o bottomSheet, minha altura(height) vai subindo(aumentando)
      // height: 500 (A altura que define do mapa)
      // progress 0 | height 0
      // progress 0.5 | height 250
      { translateY: progress.value * height.value },
    ],
    zIndex: 2, // o conteúdo terá 2, ficará por cima do abaixo(backdropAnimatedStyle)
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    // vamos controlar o zIndex atráves do isOpen, vai ativar e desativar o BottomSheet
    opacity: 1 - progress.value,
    //
    // Adicionar Delay quando o elemento estiver saindo(assim o opacity funcionará corretamente na saída,
    // assim como na entrada)
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress} />
      </Animated.View>

      <Animated.View
        style={[styles.sheet, sheetAnimatedStyle]}
        onLayout={(e) => {
          // pegando o height do mapa que passei para cá, pois esse children me permite
          // passar algum componente para dentro dele(no casso passei o mapa)
          // com esse onLayot, eu pego a height do mapa que define nele
          height.value = e.nativeEvent.layout.height;
        }}
      >
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
