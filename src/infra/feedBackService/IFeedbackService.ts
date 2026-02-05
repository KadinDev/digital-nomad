export type Feedbacktype = "success" | "error" | "warning" | "info";

export type Feedback = {
  type: Feedbacktype;
  mesage: string;
  description?: string;
};

export interface IFeedbackservice {
  send: (feedback: Feedback) => void;
}
