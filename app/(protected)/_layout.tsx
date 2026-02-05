import { useAuth } from "@/src/domains/auth/AuthContext";
import { Redirect, Stack } from "expo-router";

const isSignedIn = false; //começando como não logado

export default function ProtectedLayout() {
  const { authUser, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!authUser) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
