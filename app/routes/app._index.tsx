import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();

  const openThemeEditor = () => {
    if (shop) {
      window.open(`https://${shop}/admin/themes/current/editor?template=cart`, '_blank');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Welcome to Simple Date Picker!</p>
      <p>Your shop: <strong>{shop}</strong></p>
      <button 
        onClick={openThemeEditor}
        style={{
          background: '#008060',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Open Theme Editor
      </button>
    </div>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
