import type { LoaderFunctionArgs } from "react-router";
import db from "../db.server";

// Enhanced healthcheck endpoint for Railway
// Verifies both app and database connectivity
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const health: {
    status: string;
    timestamp: string;
    database?: string;
    error?: string;
  } = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };

  // Test database connection
  try {
    await db.$queryRaw`SELECT 1`;
    health.database = "connected";
  } catch (error) {
    console.error("Healthcheck: Database connection failed:", error);
    health.database = "disconnected";
    health.status = "degraded";
    health.error = error instanceof Error ? error.message : "Unknown database error";
  }

  const statusCode = health.database === "connected" ? 200 : 503;

  return new Response(JSON.stringify(health), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

