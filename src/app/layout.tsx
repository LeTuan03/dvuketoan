import type { Metadata } from "next";
import Script from "next/script";
import { Be_Vietnam_Pro } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ContentProtection from "@/components/shared/ContentProtection";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import NextTopLoader from 'nextjs-toploader';
import Preloader from "@/components/shared/Preloader";
import "./globals.css";

// Single, professional Vietnamese-first typeface used across the whole system
// (headings, body and labels). Purpose-built for Vietnamese diacritics, which
// reads cleaner and more corporate than the previous Inter/Playfair pairing.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-be-vietnam',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "VTAX - KẾ TOÁN THUẾ",
    template: "%s | VTAX"
  },
  description: "Dịch vụ kế toán, thuế chuyên nghiệp uy tín tại Hà Nội. Hỗ trợ doanh nghiệp tận tâm, hiệu quả.",
  keywords: ["dịch vụ kế toán", "dịch vụ thuế", "VTAX", "kế toán Hà Nội", "thuế doanh nghiệp"],
  authors: [{ name: "VTAX Team" }],
  metadataBase: new URL("https://vtax.com.vn"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vtax.com.vn",
    siteName: "VTAX",
    title: "VTAX - KẾ TOÁN THUẾ",
    description: "Dịch vụ kế toán, thuế chuyên nghiệp uy tín tại Hà Nội. Hỗ trợ doanh nghiệp tận tâm, hiệu quả.",
    images: [
      {
        url: "/images/about.svg",
        width: 1200,
        height: 630,
        alt: "VTAX - KẾ TOÁN THUẾ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTAX - KẾ TOÁN THUẾ",
    description: "Dịch vụ kế toán, thuế chuyên nghiệp uy tín tại Hà Nội. Hỗ trợ doanh nghiệp tận tâm, hiệu quả.",
    images: ["/images/about.svg"],
  },
  icons: {
    icon: [
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon.ico' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/images/site.webmanifest',
  verification: {
    google: 'chW742CBbHiq1N1wt4y4l9zpfbcqZhjEOaXaOTVDbcI',
  },
  alternates: {
    canonical: "https://vtax.com.vn",
  },
  category: "veterinary",
  classification: "Pharmaceutical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Remove browser extension attributes (e.g. Bitdefender bis_skin_checked) before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var o = new MutationObserver(function(mutations) {
                  mutations.forEach(function(m) {
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    }
                    if (m.type === 'childList') {
                      m.addedNodes.forEach(function(n) {
                        if (n.nodeType === 1) {
                          if (n.hasAttribute && n.hasAttribute('bis_skin_checked')) n.removeAttribute('bis_skin_checked');
                          if (n.querySelectorAll) n.querySelectorAll('[bis_skin_checked]').forEach(function(el) { el.removeAttribute('bis_skin_checked'); });
                        }
                      });
                    }
                  });
                });
                o.observe(document.documentElement, { attributes: true, attributeFilter: ['bis_skin_checked'], childList: true, subtree: true });
                setTimeout(function() { o.disconnect(); }, 3000);
              } catch(e) {}
            `,
          }}
        />
        {/* JSON-LD Schema Markup */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://vtax.com.vn",
              "name": "VTAX",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vtax.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <meta name="theme-color" content="#0d9488" />
      </head>
      <body className={`${beVietnamPro.className} antialiased min-h-screen`} suppressHydrationWarning>
        <NextTopLoader
          color="#d9531f"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #d9531f,0 0 5px #d9531f"
        />
        <Preloader />
        <AntdRegistry>
          <ContentProtection />
          <div suppressHydrationWarning>
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}

