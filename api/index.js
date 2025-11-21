import { createRequestListener } from "@react-router/node";
import * as build from "../build/server/index.js";

const handleRequest = createRequestListener({
  build,
  mode: process.env.NODE_ENV,
});

export default function vercelHandler(req, res) {
  return handleRequest(req, res);
}

