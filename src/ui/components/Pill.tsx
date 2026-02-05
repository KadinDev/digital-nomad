import { Pressable, PressableProps } from "react-native";
import { Box, BoxProps } from "./Box";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps["onPress"];
};

// 16 = o tamanho do icone(pois ele é o maior na altura dentro do BOX)
// 16 = somando o paddingVertical 8 + 8
// 4 = é meu borderWidt, tem 2 em cima e 2 em baixo
/**
 * A altura do PILL_HEIGHT é a soma do tamanho do ícone, padding e border width.
 * Isto é usado para calcular a marginTop. O topo da pílula para o centro é verticalmente
 */
export const PILL_HEIGHT = 16 + 16 + 4;

export function Pill({ label, iconName, active, onPress }: PillProps) {
  return (
    <Pressable onPress={onPress}>
      <Box {...boxStyle} backgroundColor={active ? "gray1" : "transparent"}>
        <Icon name={iconName} color={active ? "primary" : "gray2"} size={16} />
        <Text ml="s4" variant="text12">
          {" "}
          {label}{" "}
        </Text>
      </Box>
    </Pressable>
  );
}

const boxStyle: BoxProps = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: "rounded",
  paddingVertical: "s8",
  paddingHorizontal: "s12",
  borderColor: "gray1",
};
