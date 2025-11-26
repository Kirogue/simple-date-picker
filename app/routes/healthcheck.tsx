import type { LoaderFunctionArgs } from "react-router";

// Simple healthcheck endpoint for Railway
// This endpoint returns a 200 status to confirm the app is running
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return new Response(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

