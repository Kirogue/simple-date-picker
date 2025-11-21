import nodeAdapter from "@react-router/node";
import * as build from "../build/server/index.js";

const { createRequestHandler } = nodeAdapter;

const handleRequest = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default function vercelHandler(request, context) {
  return handleRequest(request, context);
}

