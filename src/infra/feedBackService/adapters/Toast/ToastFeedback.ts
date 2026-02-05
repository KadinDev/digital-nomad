import Toast from "react-native-toast-message";
import { IFeedbackservice } from "../../IFeedbackService";

export const ToastFeedback: IFeedbackservice = {
  send: (feedback) => {
    Toast.show({ props: feedback });
  },
};
