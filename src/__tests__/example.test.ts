function sum(a: number, b: number): number {
  return a + b;
}

test("example", () => {
  const value = sum(2, 5); // vou somar 2 + 5
  expect(value).toBe(7); // e espero que o resultado seja 7
});

// pode rodar: npx jest no terminal, ou npm run teste (que foi definido em scripts no package.json)
