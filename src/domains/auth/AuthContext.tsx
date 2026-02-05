import { useStorage } from "@/src/infra/storage/StorageContext";
import { router, SplashScreen } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { AuthUser } from "./AuthUser";

type AuthState = {
  authUser: AuthUser | null;
  isReady: boolean; // se o fluxo já foi resolvido, se o user já está autenticado ou não
  saveAuthUser: (authUser: AuthUser) => Promise<void>;
  removeAuthuser: () => Promise<void>;
};

// Segurar SplashScreen enquando pega as info do user
SplashScreen.preventAutoHideAsync();

export const AuthContext = React.createContext<AuthState>({
  authUser: null,
  isReady: false,
  saveAuthUser: async () => {},
  removeAuthuser: async () => {},
});

const AUTH_KEY = "AUTH_KEY";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const { storage } = useStorage();

  async function saveAuthUser(user: AuthUser) {
    //
    await storage.setItem(AUTH_KEY, user);
    setAuthUser(user);
    router.replace("/");
  }

  async function removeAuthuser() {
    //
    await storage.removeItem(AUTH_KEY);
    setAuthUser(null);
  }

  async function loadAuthUser() {
    try {
      const user = await storage.getItem<AuthUser>(AUTH_KEY);
      if (user) {
        setAuthUser(user);
      }
    } catch (error) {
      // TODO
      console.log(error);
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    loadAuthUser();
  }, []);

  // quando pegar as info do user, sai a SplashScreen
  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isReady,
        saveAuthUser,
        removeAuthuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Context should be used within an FeedbackProvider");
  }

  return context;
}
