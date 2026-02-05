// Uma função genérica (hook customizado)
/* 
retorna 3 coisas:
    data: os dados buscados.
    isLoading: indica se ainda está carregando.
    error: guarda um erro caso a busca falhe.


*/

import React, { useEffect, useState } from "react";

type UseFetchDataReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  error: unknown;
};

export function useAppQuery<DataT>(
  fetchData: () => Promise<DataT>,
  // DependencyList, o que preciso passar para dentro do useEffect
  dependencies: React.DependencyList = []
): UseFetchDataReturn<DataT> {
  const [data, setData] = useState<DataT>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function _fetchData() {
    try {
      setIsLoading(true);
      setError(null);
      const _data = await fetchData();

      setData(_data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _fetchData();
  }, dependencies);

  return {
    data,
    isLoading,
    error,
  };
}
