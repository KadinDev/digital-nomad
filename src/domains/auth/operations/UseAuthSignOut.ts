import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAuth } from "../AuthContext";

export function UseAuthSignOut() {
  const { auth } = useRepository();
  const { removeAuthuser } = useAuth();

  return useAppMutation({
    mutateFn: () => auth.signOut(),
    onSuccess: () => {
      removeAuthuser();
    },
  });
}
