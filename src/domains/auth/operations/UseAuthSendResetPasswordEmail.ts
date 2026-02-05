// Estamos logando

import { useFeedbackService } from "@/src/infra/feedBackService/FeedbackProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function UseAuthSendResetPasswordEmail(
  options?: UseAppMutationOptions<void>,
) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useAppMutation<void, { email: string }>({
    mutateFn: ({ email }) => auth.sendResetPasswordEmail(email),
    onSuccess: () => {
      options?.onSuccess?.(); // onSuccess pego na ResetPassword
      feedbackService.send({
        type: "success",
        mesage: "verifique sua caixa de e-mail",
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      feedbackService.send({ type: "error", mesage: "error on sign" });
    },
  });
}
