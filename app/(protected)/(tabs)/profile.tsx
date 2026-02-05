import { UseAuthSignOut } from "@/src/domains/auth/operations/UseAuthSignOut";
import { Box } from "@/src/ui/components/Box";
import { Icon } from "@/src/ui/components/Icon";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { mutate: signOut } = UseAuthSignOut();
  return (
    <Screen>
      <SafeAreaView>
        <Text> Perfil </Text>
        <Pressable onPress={signOut}>
          <Box flexDirection="row" alignItems="center">
            <Text> Sair </Text>
            <Icon name="Logout" color="primary" />
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
