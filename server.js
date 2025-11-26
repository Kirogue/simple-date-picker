import { createRequestHandler } from "@react-router/express";
import express from "express";

// Log memory usage periodically
const logMemory = () => {
  const used = process.memoryUsage();
  console.log(`Memory: RSS=${Math.round(used.rss / 1024 / 1024)}MB, Heap=${Math.round(used.heapUsed / 1024 / 1024)}/${Math.round(used.heapTotal / 1024 / 1024)}MB`);
};

// Log memory every 30 seconds
setInterval(logMemory, 30000);

// Log when process is about to exit
process.on("exit", (code) => {
  console.log(`Process exit with code: ${code}`);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT signal");
  process.exit(0);
});

// Catch uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve static files from the build directory
app.use(express.static("build/client"));

// Import the build before setting up the route handler
let build;
try {
  build = await import("./build/server/index.js");
  console.log("Build loaded successfully");
} catch (err) {
  console.error("Failed to load build:", err);
  process.exit(1);
}

// Handle all other requests with the React Router app
// Express 5 requires named wildcards, use "{*path}" syntax
app.all(
  "{*path}",
  createRequestHandler({ build })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`SHOPIFY_APP_URL: ${process.env.SHOPIFY_APP_URL || 'not set'}`);
  logMemory(); // Log initial memory usage
  console.log("Server ready to accept connections");
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

