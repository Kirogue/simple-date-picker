import { createRequestHandler } from "@react-router/node";
import * as build from "../build/server/index.js";

const handleRequest = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default async function vercelHandler(request, context) {
  return handleRequest(request, context);
}

