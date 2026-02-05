import { Repositories } from "@/src/domains/Repositories";
import React from "react";

export const RepositoryContext = React.createContext<Repositories>(
  {} as Repositories
);

export const RepositoryProvider = RepositoryContext.Provider;

export function useRepository(): Repositories {
  const context = React.useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "Repository context should be used within a RepositoryProvider"
    );
  }
  return context;
}
