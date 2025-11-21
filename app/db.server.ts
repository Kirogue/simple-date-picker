import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient;
}

// Configure Prisma for serverless environments (Vercel)
// Add connection pool parameters to the DATABASE_URL for better connection handling
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL || "";
  // If URL already has query parameters, append; otherwise add them
  if (url.includes("?")) {
    return `${url}&connection_limit=1&pool_timeout=20`;
  }
  return `${url}?connection_limit=1&pool_timeout=20`;
};

const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
};

if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient(prismaClientOptions);
  }
}

const prisma = global.prismaGlobal ?? new PrismaClient(prismaClientOptions);

export default prisma;
