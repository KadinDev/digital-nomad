import { Alert } from "react-native";
import { IFeedbackservice } from "../../IFeedbackService";

export const AlertFeedback: IFeedbackservice = {
  send: (feedback) => {
    Alert.alert(feedback.mesage, feedback.description);
  },
};
