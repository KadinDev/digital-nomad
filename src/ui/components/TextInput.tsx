import { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { Box, BoxProps } from "./Box";
import { Text } from "./Text";

type TextInputProps = RNTextInputProps & {
  label: string;
  errorMessage?: string;
};

export function TextInput({
  label,
  errorMessage,
  ...textInputProps
}: TextInputProps) {
  //
  const { colors, textVariants } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  //

  const borderColor = errorMessage
    ? "fbErrorSurface"
    : isFocused
    ? "text"
    : "gray1";

  return (
    <Box>
      <Text mb="s4" variant="title14">
        {" "}
        {label}{" "}
      </Text>
      <Box {...textInputBoxStyle} borderColor={borderColor}>
        <RNTextInput
          {...textInputProps}
          onFocus={() => setIsFocused(true)} // quando clicar dentro do input
          onBlur={() => setIsFocused(false)} // quando clicar fora do input
          placeholderTextColor={colors.gray2}
          style={{
            ...textVariants.text16,
            color: colors.text,
            height: "100%",
            width: "100%",
            flexShrink: 1,
          }}
        />
      </Box>
      <Text marginVertical="s4" variant="text12" color="fbErrorSurface">
        {" "}
        {errorMessage}{" "}
      </Text>
    </Box>
  );
}

const textInputBoxStyle: BoxProps = {
  flexDirection: "row",
  borderWidth: 2,
  borderRadius: "default",
  height: 50,
  alignItems: "center",
  paddingHorizontal: "s16",
};
