import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { Page, Card, BlockStack, Text, Button } from "@shopify/polaris";

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
    <Page title="Dashboard">
      <Card>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h2">
            Welcome to Simple Date Picker!
          </Text>
          <Text variant="bodyMd">
            Your app is now running successfully on shop: <strong>{shop}</strong>
          </Text>
          <Text variant="bodyMd">
            Click the button below to open the theme editor and add the date picker to your cart page.
          </Text>
          <Button variant="primary" onClick={openThemeEditor}>
            Open Theme Editor
          </Button>
        </BlockStack>
      </Card>
    </Page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
