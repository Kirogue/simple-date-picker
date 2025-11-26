import { createRequestHandler } from "@react-router/express";
import express from "express";

// Catch uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const app = express();

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
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

