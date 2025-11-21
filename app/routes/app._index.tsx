import { useEffect, useState } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();
  const shopify = useAppBridge();

  const openThemeEditor = () => {
    if (shop) {
      // Removed addAppBlockId to prevent "block not added" errors.
      // Just opens the editor on the Cart template.
      window.open(`https://${shop}/admin/themes/current/editor?template=cart`, '_blank');
    } else {
      shopify.toast.show("Could not detect shop domain");
    }
  };

  // Brand Colors
  const BRAND_BLACK = "#1a1a1a";
  const BRAND_TEAL = "#008080"; // Aquamarine/Teal
  const BRAND_TEAL_LIGHT = "#e6fffa"; 

  // Custom SVG Icons with Brand Colors
  const IconEdit = () => (
    <svg viewBox="0 0 20 20" width="24" height="24" fill={BRAND_TEAL}><path d="M13.707 2.293a1 1 0 0 0-1.414 0l-9 9a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414 0l9-9a1 1 0 0 0 0-1.414l-4-4zm-1.414 8.293-2.586-2.586 2.293-2.293 2.586 2.586-2.293 2.293zm-4 4-2.586-2.586 2.293-2.293 2.586 2.586-2.293 2.293zM2 18v-4h2v2h2v2H2z"/></svg>
  );
  const IconCart = () => (
    <svg viewBox="0 0 20 20" width="24" height="24" fill={BRAND_TEAL}><path d="M17 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm11.75-11.45L17.5 13h-13l-1.35-7.4A1 1 0 0 1 4.1 4.15l13.1 1.3a1 1 0 0 1 .55 1.1zM5 6l1 6h10l1-6H5z"/></svg>
  );
  const IconAdd = () => (
    <svg viewBox="0 0 20 20" width="24" height="24" fill={BRAND_TEAL}><path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/></svg>
  );
  const IconSettings = () => (
    <svg viewBox="0 0 20 20" width="24" height="24" fill={BRAND_TEAL}><path d="M10 0a1 1 0 0 1 1 1v1.066a8.001 8.001 0 0 1 2.396.992l.754-.754a1 1 0 1 1 1.414 1.414l-.754.754A8.001 8.001 0 0 1 15.803 6.6l1.066.133a1 1 0 1 1-.248 1.984l-1.066-.133a8.005 8.005 0 0 1-.492 2.457l.96 1.32a1 1 0 1 1-1.616 1.176l-.96-1.32a8.001 8.001 0 0 1-2.045 1.65l.664 1.462a1 1 0 1 1-1.82.828l-.664-1.462a8.004 8.004 0 0 1-2.564 0l-.664 1.462a1 1 0 1 1-1.82-.828l.664-1.462A8.001 8.001 0 0 1 3.402 12.23l-.96 1.32a1 1 0 1 1-1.616-1.176l.96-1.32a8.005 8.005 0 0 1-.492-2.457l-1.066.133a1 1 0 1 1-.248-1.984l1.066-.133A8.001 8.001 0 0 1 2.034 4.468l-.754-.754a1 1 0 1 1 1.414-1.414l.754.754A8.001 8.001 0 0 1 9 2.066V1a1 1 0 0 1 1-1zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg>
  );

  return (
    <s-page heading="Dashboard">
      
      {/* Hero Section - Custom Style */}
      <div style={{ 
        marginBottom: '32px', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', 
        borderRadius: '12px', 
        padding: '40px', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Agency Logo Watermark (Top Right) */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.5 }}>
           <img src="/logo%20blanco.png" alt="Agency Logo" width="80" style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ maxWidth: '600px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: 'white' }}>
            Ready to schedule deliveries?
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.5', marginBottom: '24px' }}>
            Enable the <strong>Delivery Date Picker</strong> on your cart page in less than 1 minute. 
            Start collecting customer preferences today.
          </p>
          <button 
            onClick={openThemeEditor}
            style={{
              background: BRAND_TEAL,
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Open Theme Editor →
          </button>
        </div>
        {/* Illustration SVG */}
        <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
           <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              <path d="M16 2V6" stroke={BRAND_TEAL} strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 2V6" stroke={BRAND_TEAL} strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 10H21" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              <path d="M8 14H8.01" stroke={BRAND_TEAL} strokeWidth="3" strokeLinecap="round"/>
              <path d="M12 14H12.01" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 14H16.01" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round"/>
           </svg>
        </div>
      </div>

      <s-layout>
        {/* Main Content: Setup Guide */}
        <s-layout-section>
          <s-card>
            <s-section>
               <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                  <s-text variant="headingLg" as="h2">Installation Guide</s-text>
               </div>

              <s-block-stack gap="600">
                
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '20px' }}>
                     <div style={{ 
                       background: BRAND_TEAL_LIGHT, 
                       width: '48px', height: '48px', 
                       borderRadius: '12px', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       flexShrink: 0
                     }}>
                        <IconEdit />
                     </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: BRAND_BLACK }}>1. Open Theme Editor</h3>
                      <p style={{ color: '#666', lineHeight: '1.5' }}>
                        Click the main button above to launch the theme customizer directly on your Cart page.
                      </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ 
                       background: BRAND_TEAL_LIGHT, 
                       width: '48px', height: '48px', 
                       borderRadius: '12px', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       flexShrink: 0
                     }}>
                        <IconAdd />
                     </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: BRAND_BLACK }}>2. Add App Block</h3>
                      <p style={{ color: '#666', lineHeight: '1.5' }}>
                        In the left sidebar, find "Subtotal" or "Checkout". Click <strong>Add Block</strong> and choose <strong>Delivery Date Picker</strong>.
                      </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ 
                       background: BRAND_TEAL_LIGHT, 
                       width: '48px', height: '48px', 
                       borderRadius: '12px', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       flexShrink: 0
                     }}>
                        <IconSettings />
                     </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: BRAND_BLACK }}>3. Configure Rules</h3>
                      <p style={{ color: '#666', lineHeight: '1.5' }}>
                        Click the block to open settings. Set your <strong>Lead Time</strong>, <strong>Blackout Dates</strong>, and <strong>Time Slots</strong>.
                      </p>
                    </div>
                </div>

              </s-block-stack>
            </s-section>
          </s-card>
          
          {/* Pro Tip Banner - Stylized */}
          <div style={{ 
            marginTop: '20px', 
            background: '#f8f9fa', 
            borderLeft: `4px solid ${BRAND_TEAL}`, 
            padding: '16px', 
            borderRadius: '4px' 
          }}>
            <h4 style={{ fontWeight: 'bold', color: BRAND_TEAL, marginBottom: '4px' }}>✨ Pro Tip: Branding</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
              You can fully match the date picker to your store's theme (colors, radius, padding) in the "Design & Styling" section of the block settings.
            </p>
          </div>

        </s-layout-section>

        {/* Sidebar */}
        <s-layout-section variant="one-third">
          <s-block-stack gap="400">
            
            <s-card>
              <s-section heading="App Status">
                <s-block-stack gap="300">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#444' }}>Plan</span>
                    <span style={{ background: '#e3fcf7', color: '#007a5e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontWeight: '600', color: '#444' }}>Version</span>
                     <span style={{ color: '#888' }}>1.0.0</span>
                  </div>
                </s-block-stack>
              </s-section>
            </s-card>
            
            <s-card>
              <s-section heading="Support">
                <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
                  Need help setting up advanced delivery rules?
                </p>
                <s-block-stack gap="200">
                  <a href="mailto:support@example.com" style={{ color: BRAND_TEAL, textDecoration: 'none', fontWeight: '600' }}>Contact Support →</a>
                  <a href="#" target="_blank" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Documentation</a>
                </s-block-stack>
              </s-section>
            </s-card>

          </s-block-stack>
        </s-layout-section>
      </s-layout>
      
      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#999', fontSize: '12px' }}>
         © 2025 SinergIA Digital. Built for Shopify.
      </div>

    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
