import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { 
  Page, 
  Layout, 
  Card, 
  BlockStack, 
  Text, 
  Button, 
  InlineStack, 
  Box,
  Banner,
  List
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();
  const shopify = useAppBridge();

  const openThemeEditor = () => {
    if (shop) {
      window.open(`https://${shop}/admin/themes/current/editor?template=cart`, '_blank');
    } else {
      shopify.toast.show("Could not detect shop domain");
    }
  };

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h2">
                Ready to schedule deliveries?
              </Text>
              <Text variant="bodyMd">
                Enable the <strong>Delivery Date Picker</strong> on your cart page in less than 1 minute. 
                Start collecting customer preferences today.
              </Text>
              <Box>
                <Button variant="primary" onClick={openThemeEditor}>
                  Open Theme Editor →
                </Button>
              </Box>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="500">
              <Text variant="headingMd" as="h3">Installation Guide</Text>
              
              <BlockStack gap="400">
                <Box>
                  <BlockStack gap="200">
                    <Text variant="headingSm" as="h4">1. Open Theme Editor</Text>
                    <Text variant="bodyMd" tone="subdued">
                      Click the button above to launch the theme customizer directly on your Cart page.
                    </Text>
                  </BlockStack>
                </Box>

                <Box>
                  <BlockStack gap="200">
                    <Text variant="headingSm" as="h4">2. Add App Block</Text>
                    <Text variant="bodyMd" tone="subdued">
                      In the left sidebar, find "Subtotal" or "Checkout". Click <strong>Add Block</strong> and choose <strong>Delivery Date Picker</strong>.
                    </Text>
                  </BlockStack>
                </Box>

                <Box>
                  <BlockStack gap="200">
                    <Text variant="headingSm" as="h4">3. Configure Rules</Text>
                    <Text variant="bodyMd" tone="subdued">
                      Click the block to open settings. Set your <strong>Lead Time</strong>, <strong>Blackout Dates</strong>, and <strong>Time Slots</strong>.
                    </Text>
                  </BlockStack>
                </Box>
              </BlockStack>
            </BlockStack>
          </Card>

          <Banner tone="info">
            <BlockStack gap="200">
              <Text variant="headingSm" as="h5">✨ Pro Tip: Branding</Text>
              <Text variant="bodyMd">
                You can fully match the date picker to your store's theme (colors, radius, padding) in the "Design & Styling" section of the block settings.
              </Text>
            </BlockStack>
          </Banner>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">App Status</Text>
                <InlineStack align="space-between">
                  <Text variant="bodyMd" fontWeight="semibold">Plan</Text>
                  <Text variant="bodyMd" tone="success">FREE</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodyMd" fontWeight="semibold">Version</Text>
                  <Text variant="bodyMd" tone="subdued">1.0.0</Text>
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Support</Text>
                <Text variant="bodyMd" tone="subdued">
                  Need help setting up advanced delivery rules?
                </Text>
                <BlockStack gap="200">
                  <Button url="mailto:support@example.com">Contact Support →</Button>
                  <Button url="#" variant="plain">Documentation</Button>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
      
      <Box paddingBlockStart="400">
        <Text variant="bodySm" tone="subdued" alignment="center">
          © 2025 SinergIA Digital. Built for Shopify.
        </Text>
      </Box>
    </Page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
