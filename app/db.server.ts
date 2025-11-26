import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient;
}

// Log database configuration (without sensitive data)
const logDbConfig = () => {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    console.error("DATABASE_URL is not set!");
    return;
  }
  try {
    const parsed = new URL(url);
    console.log(`Database host: ${parsed.hostname}`);
    console.log(`Database name: ${parsed.pathname.slice(1)}`);
  } catch (e) {
    console.log("Could not parse DATABASE_URL");
  }
};

logDbConfig();

// Configure Prisma for Railway/production environments
// Railway PostgreSQL requires proper connection parameters
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    console.error("DATABASE_URL is not set - database operations will fail");
    return url;
  }
  
  // Build connection parameters
  const params = new URLSearchParams();
  params.set("connection_limit", "5");
  params.set("pool_timeout", "30");
  
  // Railway internal proxy handles SSL, but external connections need sslmode
  // Check if we're using Railway's internal proxy (contains 'proxy.rlwy.net')
  if (url.includes("proxy.rlwy.net")) {
    // Internal Railway proxy - SSL is handled by the proxy
    params.set("sslmode", "disable");
  } else if (url.includes("railway.internal")) {
    // Internal Railway connection - no SSL needed
    params.set("sslmode", "disable");
  } else if (process.env.NODE_ENV === "production") {
    // External connection in production - require SSL
    params.set("sslmode", "require");
  }
  
  // Append parameters to URL
  const separator = url.includes("?") ? "&" : "?";
  const finalUrl = `${url}${separator}${params.toString()}`;
  console.log("Database connection configured with SSL mode:", url.includes("railway.internal") ? "disabled (internal)" : "enabled");
  return finalUrl;
};

const prismaClientOptions: ConstructorParameters<typeof PrismaClient>[0] = {
  log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] as const
    : ["error"] as const,
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
};

// In development, reuse the global prisma instance to prevent too many connections
if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient(prismaClientOptions);
  }
}

const prisma = global.prismaGlobal ?? new PrismaClient(prismaClientOptions);

export default prisma;
