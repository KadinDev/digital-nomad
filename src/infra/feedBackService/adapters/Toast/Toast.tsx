import { Box } from "@/src/ui/components/Box";
import { Text } from "@/src/ui/components/Text";
import { ThemeColors } from "@/src/ui/theme/theme";
import RNToast, { ToastConfig } from "react-native-toast-message";
import { Feedback, Feedbacktype } from "../../IFeedbackService";

const toastColors: Record<
  Feedbacktype,
  { backgroundColor: ThemeColors; textColor: ThemeColors }
> = {
  error: {
    backgroundColor: "fbErrorBg",
    textColor: "fbErrorSurface",
  },
  success: {
    backgroundColor: "fbSuccessBg",
    textColor: "fbSuccessSurface",
  },
  warning: {
    backgroundColor: "fbWarningBg",
    textColor: "fbWarningSurface",
  },
  info: {
    backgroundColor: "fbInfoBg",
    textColor: "fbInfoSurface",
  },
};

function CustomToast({ type, description, mesage }: Feedback) {
  const { backgroundColor, textColor } = toastColors[type ?? "success"];

  return (
    <Box
      backgroundColor={backgroundColor}
      paddingHorizontal="s24"
      paddingVertical="s12"
      borderRadius="default"
    >
      <Text color={textColor} variant="text16">
        {mesage}
      </Text>
      {description && (
        <Text mt="s4" color={textColor} textAlign="center">
          {description}
        </Text>
      )}
    </Box>
  );
}

const toastConfig: ToastConfig = {
  success: ({ props }) => <CustomToast {...props} />,
  error: ({ props }) => <CustomToast {...props} />,
  warning: ({ props }) => <CustomToast {...props} />,
  info: ({ props }) => <CustomToast {...props} />,
};

export function Toast() {
  return (
    <RNToast
      autoHide
      topOffset={80}
      visibilityTime={3000}
      config={toastConfig}
    />
  );
}
