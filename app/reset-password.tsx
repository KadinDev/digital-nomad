import { UseAuthSendResetPasswordEmail } from "@/src/domains/auth/operations/UseAuthSendResetPasswordEmail";
import { useFeedbackService } from "@/src/infra/feedBackService/FeedbackProvider";
import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const feedBackService = useFeedbackService();
  //
  const { mutate: sendResetEmail } = UseAuthSendResetPasswordEmail({
    onSuccess: router.back,
  });

  function handleResetPassword() {
    //
    if (!email) {
      feedBackService.send({
        type: "info",
        mesage: "Campo vazio não permitido",
      });
      return;
    }
    sendResetEmail({ email });
  }

  return (
    <Screen>
      <SafeAreaView>
        <Header title="Recuperar Senha" />
        <Text mb="s16">
          Digite o endereço de e-mail associado à sua conta e enviaremos
          instruções para redefinir sua senha{" "}
        </Text>
        <TextInput
          label="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="seu email"
        />

        <Button title="Enviar Link" onPress={handleResetPassword} />

        <TextLink
          goBackOnPress
          text="Lembrou sua senha?"
          ctaText="Voltar para o login"
        />

        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
