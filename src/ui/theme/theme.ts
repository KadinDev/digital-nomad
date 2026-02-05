import { createTheme } from "@shopify/restyle";

const palette = {
  fieryRed: "#FF4B4B",
  midnightBlack: "#1B1B1B",
  charcoalGrey: "#302E2D",
  stoneGrey: "#5C5C5C",
  pureWhite: "#FFFFFF",
  transparent: "transparent",

  fbErrorBg: "#3A1B1B",
  fbErrorSurface: "#D32F2F",

  fbSuccessBg: "#1E3320",
  fbSuccessSurface: "#4CAF50",

  fbWarningBg: "#1A283A",
  fbWarningSurface: "#FFC107",

  fbInfoBg: "#332B1A",
  fbInfoSurface: "#42A5F5",
};

const theme = createTheme({
  colors: {
    background: palette.midnightBlack,
    primary: palette.fieryRed,
    text: palette.pureWhite,
    gray1: palette.charcoalGrey,
    gray2: palette.stoneGrey,
    ...palette, // colocar a paleta de cores aqui tbm
  },
  spacing: {
    s2: 2,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s20: 20,
    s24: 24,
    s32: 32,
    s40: 40,
    s48: 48,
    s56: 56,
    padding: 16, // padding de default
  },
  textVariants: {
    defaults: {
      // Como DEFAULT
      color: "text", // assim já acessa o Textdo colors acima
      fontFamily: "PoppinsRegular",
    },
    title28: {
      fontSize: 28,
      lineHeight: 30,
      fontFamily: "PoppinsSemiBold",
    },
    title22: {
      fontSize: 22,
      lineHeight: 24,

      fontFamily: "PoppinsSemiBold",
    },
    title16: {
      fontSize: 16,
      lineHeight: 18,

      fontFamily: "PoppinsSemiBold",
    },
    title14: {
      fontSize: 14,
      lineHeight: 16,

      fontFamily: "PoppinsSemiBold",
    },
    text18: {
      fontSize: 18,
      lineHeight: 20,

      // Como esses não passei a fontFamily eles irão começar como defaults (definido acima)
    },
    text16: {
      fontSize: 16,
      lineHeight: 18,
    },
    text14: {
      fontSize: 14,
      lineHeight: 16,
    },
    text12: {
      lineHeight: 14,
      fontSize: 12,
    },
  },
  borderRadii: {
    // borderRadius
    default: 16,
    rounded: 500, // uma forma "exagerada" de deixar sempre 100% arredondado
  },
  boxShadowns: {
    primary: "3px 3px 10px 3px rgba(255,75,75,0.4)",
  },
});

export type Theme = typeof theme;
export default theme;

// Utilizando o keyof, para o colors não vim como objeto,
// e sim vim cada item(cor), de dentro do objeto colors
export type ThemeColors = keyof Theme["colors"];
