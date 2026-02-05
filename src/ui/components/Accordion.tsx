import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import theme from "../theme/theme";
import { useAppTheme } from "../theme/useAppTheme";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type AccordionProps = {
  title: string;
  description: string;
};
export function Accordion({ title, description }: AccordionProps) {
  const isOpen = useSharedValue(false);
  const progress = useSharedValue(0);

  function handleOpenPress() {
    isOpen.value = !isOpen.value;
    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 300 }); // withTiming = para usar animação
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} progress={progress} />
        <AccordionBody
          description={description}
          isOpen={isOpen}
          progress={progress}
        />
      </View>
    </Pressable>
  );
}

function AccordionHeader({
  title,
  progress,
}: {
  title: string;
  progress: SharedValue<number>;
}) {
  const { colors, borderRadii } = useAppTheme();
  //
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray2, colors.primary] // cor inicial e cor final
    ),
    transform: [
      {
        // quero interpolar os valores 0 e 1, e vai de 0 a -180
        rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg",
      },
    ],
  }));

  const animatedBackgroundHeader = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.transparent, colors.gray1]
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.default, 0]
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.default, 0]
    ),
  }));

  return (
    <Animated.View style={[styles.header, animatedBackgroundHeader]}>
      <Box flexShrink={1}>
        <Text variant="text16"> {title} </Text>
      </Box>
      <Animated.Image
        source={require("@/assets/images/chevron-down.png")}
        style={[iconAnimatedStyle, { width: 24, height: 24 }]}
      />
    </Animated.View>
  );
}

function AccordionBody({
  description,
  isOpen,
  progress,
}: {
  description: string;
  isOpen: SharedValue<boolean>; // tipagem para a animação em AccordionBody
  progress: SharedValue<number>;
}) {
  const { borderRadii } = useAppTheme();
  const height = useSharedValue(0); // pegar o valor da altura para usar de forma compartilhada nos elementos

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
      // quando isOpen for true, vai retornar 1(tipado com Number), quando for false, retorna 0
      height: interpolate(progress.value, [0, 1], [0, height.value]),
      borderTopLeftRadius: interpolate(
        progress.value,
        [0, 1],
        [borderRadii.default, 0]
      ),
      borderTopRightRadius: interpolate(
        progress.value,
        [0, 1],
        [borderRadii.default, 0]
      ),
    };
  });

  return (
    /** {overflow: 'hidden'} = o que tiver pra fora do componente pai(Animated.View), ele vai esconder
     * se tiver um position absolute do elemento filho(View)
     */
    <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
      {/** onLayout = para pegar a height dessa View de forma dinâmica */}
      <View
        style={styles.body}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        <Text variant="text16"> {description} </Text>
        <Icon name="Chevron-up" color="gray1" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: theme.borderRadii.default,
  },
  body: {
    position: "absolute",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
});
