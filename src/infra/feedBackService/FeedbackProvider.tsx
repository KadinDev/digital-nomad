import React from "react";
import { IFeedbackservice } from "./IFeedbackService";

export const FeedbackContext = React.createContext<IFeedbackservice>(
  {} as IFeedbackservice
);

export const FeedbackProvider = FeedbackContext.Provider;

export function useFeedbackService(): IFeedbackservice {
  const context = React.useContext(FeedbackContext);

  if (!context) {
    throw new Error(
      "Feedback context should be used within a Feedback Provider"
    );
  }
  return context;
}
