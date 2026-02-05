import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";
// Box é como se fosse a View
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle";
import { Theme } from "../theme/theme";

export const Box = createBox<Theme>();

// extrair as propriedades do meu componente Box
export type BoxProps = React.ComponentProps<typeof Box>;

//
// tudo esse configuração abaixo foi criado para o botão de login
// assim já mando o TouchableOpacity configurado dentro de um Box, com todas as propriedades
// do TouchableOpacity e com acesso ao meu Style no Theme
type RestyleStyle = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

//
export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleStyle;
export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  RNTouchableOpacity
);
