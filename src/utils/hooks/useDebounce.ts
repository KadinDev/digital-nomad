import { useEffect, useState } from "react";

// Essa é uma função personalizada (hook) chamada useDebounce
// Ela serve para "atrasar" uma mudança de valor, esperando um tempo antes de realmente atualizar
export function useDebounce<T>(value: T, delay = 500) {
  //
  // Cria um estado interno chamado debouncedValue, que começa com o mesmo valor recebido por parâmetro
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um temporizador que espera o tempo definido em 'delay' (padrão 500ms = 1 segundo)
    // Após esse tempo, ele atualiza o debouncedValue com o novo valor
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Essa função de retorno do useEffect é executada ANTES do próximo efeito rodar ou quando o componente for desmontado
    // Ela limpa o temporizador anterior, garantindo que só o último valor (depois do tempo de espera) seja considerado
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
