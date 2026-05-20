import { render, screen } from "@testing-library/react-native";
import { Pressable, Text, View } from "react-native";

function Component({ label, loading }: { label: string; loading: boolean }) {
  if (loading) {
    return <Text> is loading... </Text>;
  }

  return (
    <View>
      <Pressable>
        <Text> {label} </Text>
      </Pressable>
    </View>
  );
}

describe("Component", () => {
  // Quando minha loading for false tem que mostrar a label
  test("should display the lavel when in not loading", () => {
    // Dentro do render, passamos o componente que queremos testar
    render(<Component label="Hello World" loading={false} />);

    const element = screen.getByText("Hello World");

    // espera que o elemento esteja na tela
    expect(element).toBeOnTheScreen();
  });

  it("should display the lavel when in not loading", () => {
    // Dentro do render, passamos o componente que queremos testar
    render(<Component label="Hello World" loading={true} />);

    // colocando assim: /is loading/, ele vai dizer que espera algum texto não importa qual seja, pois o de cima espera o Hello World
    // e esse i, ele diz pra ignorar letra maiuscula e minuscula

    // espera que o elemento esteja na tela
    expect(screen.getByText(/is loading.../i)).toBeOnTheScreen();
  });
});
