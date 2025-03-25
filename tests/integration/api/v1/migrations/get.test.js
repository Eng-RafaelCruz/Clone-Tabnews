test("GET to api/v1/migrations should return 200", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);

    // Verificações adicionais para garantir que a resposta está correta
    if (responseBody.length > 0) {
      // Se houver migrações, verifica se têm a estrutura esperada
      responseBody.forEach((migration) => {
        expect(migration).toHaveProperty("name");
      });
    }
  } catch (error) {
    console.error("Erro no teste de migrations:", error);
    throw error; // Relança o erro para o Jest falhar o teste
  }
});
