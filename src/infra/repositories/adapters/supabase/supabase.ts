import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { Database } from "./types";

/**
 * no Supabase vai: Project Settings / Data API - Pegar a URL (Project URL)
 * Depois: API Keys / Legacy API Keys / anon public
 *
 * Criei um arquivo .env, e coloquei tbm o .env no .gitignore
 *
 * e como boa prática cria o .env.template - esse vai para o git quando der o commit
 * para informar algum DEV que queria testar o código quais informações ele vai precisar
 * colocar no .env.
 */

function getSupabseEnvs(): { url: string; anonKey: string } {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase env was not defined");
  }

  return {
    url,
    anonKey,
  };
}

const envs = getSupabseEnvs();

export const supabase = createClient<Database>(envs.url, envs.anonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
