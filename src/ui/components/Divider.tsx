import { Box, BoxProps } from "./Box";

/**
 * BoxProps, coloquei aqui para quando chamar esse Divider para alguma tela,
 * decidir se vai colocar o padding ou não. caso a tela já tenha padding nas laterais definidos
 * não irá precisar colocar. se a tela não tiver padding nas laterais definido aí vou poder chamar
 * o padding nas laterais para o Divider
 */
export function Divider(props: BoxProps) {
  return (
    <Box marginVertical="s24" {...props}>
      <Box width="100%" borderStartColor="gray1" />
    </Box>
  );
}
