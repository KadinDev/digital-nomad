// Uma função genérica (hook customizado)
/* 
retorna 3 coisas:
    data: os dados buscados.
    isLoading: indica se ainda está carregando.
    error: guarda um erro caso a busca falhe.


*/

import { useState } from "react";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variable: TVariables) => Promise<TData | void>;
  isLoading: boolean;
  error: unknown;
};

export type UseAppMutationOptions<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

type UseAppMutationParams<TData, TVariables> = {
  mutateFn: (variable: TVariables) => Promise<TData>;
} & UseAppMutationOptions<TData>;

// mutateFn = Mutate Function
// VariableT = variaveis, no caso do signIn é o e-mail / password
export function useAppMutation<TData, TVariables>({
  mutateFn,
  onSuccess,
  onError,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function mutate(variables: TVariables) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await mutateFn(variables);
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    mutate,
    isLoading,
    error,
  };
}
