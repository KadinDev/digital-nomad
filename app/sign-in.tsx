import { useAuthSignIn } from "@/src/domains/auth/operations/UseAuthSignIn";
import { useFeedbackService } from "@/src/infra/feedBackService/FeedbackProvider";
import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const feedBackService = useFeedbackService();
  const { mutate: signIn } = useAuthSignIn();

  function handleSignIn() {
    if (!email || !password) {
      feedBackService.send({
        type: "info",
        mesage: "Campo vazio não permitido",
      });
      return;
    }
    signIn({ email, password });
  }

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Logo />
        <Text variant="title22" alignSelf="center" mb="s16">
          Bem-vindo
        </Text>
        <TextInput
          label="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="seu email"
        />
        <TextInput
          //errorMessage="usuário não existe"
          label="Senha"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="digite sua senha"
        />

        <Link href="/reset-password" asChild>
          <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
            Esqueci minha senha
          </Text>
        </Link>

        <Button title="Entrar" onPress={handleSignIn} />

        <TextLink
          href="/sign-up"
          text="Ainda não tem sua conta?"
          ctaText="Criar"
        />
      </SafeAreaView>
    </Screen>
  );
}
