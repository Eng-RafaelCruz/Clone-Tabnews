import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  // Construir DATABASE_URL a partir das variáveis individuais se não estiver definida
  let databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    const ssl = process.env.NODE_ENV === "development" ? "" : "?sslmode=require";
    databaseUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}${ssl}`;
  }
  
  try {
    const migrations = await migrationRunner({
      databaseUrl: databaseUrl,
      dryRun: true,
      dir: join("migrations"),
      direction: "up",
    });
    
    // Garantir que a resposta seja um array
    const migrationsArray = Array.isArray(migrations) ? migrations : [migrations];
    response.status(200).json(migrationsArray);
  } catch (error) {
    console.error("Error running migrations:", error);
    response.status(500).json({ error: "Failed to process migrations" });
  }
}
