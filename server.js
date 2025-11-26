import { createRequestHandler } from "@react-router/express";
import express from "express";

const app = express();

// Serve static files from the build directory
app.use(express.static("build/client"));

// Handle all other requests with the React Router app
// Express 5 requires named wildcards, use "{*path}" syntax
app.all(
  "{*path}",
  createRequestHandler({
    build: await import("./build/server/index.js"),
  })
);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

