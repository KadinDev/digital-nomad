// Estamos logando

import { useFeedbackService } from "@/src/infra/feedBackService/FeedbackProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { AuthSignUpParams } from "../IAuthRepo";

export function useAuthSignUp(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useAppMutation<void, AuthSignUpParams>({
    mutateFn: (params) => auth.signUp(params),
    onSuccess: () => {
      options?.onSuccess?.(); // onSuccess pego na SignUpScreen
      feedbackService.send({
        type: "success",
        mesage: "Cadastro feito com sucesso",
      });
    },
    onError: (error) => {
      options?.onError?.(error);

      feedbackService.send({ type: "error", mesage: "E-mail já cadastrado" });
    },
  });
}
