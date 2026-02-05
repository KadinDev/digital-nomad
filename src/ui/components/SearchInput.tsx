import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { Box, BoxProps } from "./Box";
import { IconButton } from "./IconButton";

type SearchInputProps = {} & Pick<
  TextInputProps,
  "value" | "onChangeText" | "placeholder" | "placeholderTextColor"
>;

export function SearchInput({
  value,
  onChangeText,
  placeholder,
}: SearchInputProps) {
  const { colors, textVariants } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);

  function onPressIconButton() {
    // se tiver algum texto, vou resetar(limpar o input)
    if (value!.length > 0) {
      onChangeText?.("");
    }
  }

  return (
    <Box
      {...boxStyle}
      style={{ borderColor: isFocused ? colors.primary : colors.gray1 }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        onFocus={() => setIsFocused(true)} // quando o user entra no Input
        onBlur={() => setIsFocused(false)} // quando o user sai no Input
        style={{
          ...textVariants.text16,
          color: colors.text,
          height: "100%",
          width: "100%",
          flexShrink: 1, // Permite que o componente encolha para caber dentro do espaço disponível.
        }}
      />

      <IconButton
        iconName={value!.length > 0 ? "Close" : "Search-outline"}
        onPress={onPressIconButton}
      />
    </Box>
  );
}

const boxStyle: BoxProps = {
  flexDirection: "row",
  padding: "s8",
  justifyContent: "space-between",
  backgroundColor: "gray1",
  height: 70,
  alignItems: "center",
  borderRadius: "rounded",
  borderWidth: 2,
  paddingLeft: "s16",
};
