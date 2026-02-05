// Estamos logando

import { useFeedbackService } from "@/src/infra/feedBackService/FeedbackProvider";
import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  const { saveAuthUser } = useAuth();

  return useAppMutation<AuthUser, { email: string; password: string }>({
    mutateFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => {
      saveAuthUser(authUser); // Adicionado saveAuthUser
      feedbackService.send({
        type: "success",
        //mesage: `Seja bem vindo(a): ${authUser.email}`,
        mesage: "Bem vindo(a) ao Nomad Digital",
      });
    },
    onError: (error) => {
      feedbackService.send({
        type: "error",
        mesage: "Erro ao fazer login",
        //description: "usuário não encontrado",
      });
    },
  });
}
